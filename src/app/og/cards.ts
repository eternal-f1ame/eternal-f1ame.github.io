import { about, blog, gallery, home, person, publications, work } from "@/app/resources/content";
import { formatDate } from "@/app/utils/formatDate";
import { getPoems } from "@/app/utils/poems";
import { getPosts } from "@/app/utils/utils";

export interface ShareCard {
  /* file name under /og, without the .png */
  card: string;
  kicker: string;
  title: string;
  detail?: string;
  /* a public/ path; poems carry their photograph */
  photo?: string;
  /* a poem's opening lines */
  lines?: string[];
}

/* every link preview the site serves: one per page, post, project and poem */
export function shareCards(): ShareCard[] {
  const posts = getPosts(["src", "app", "blog", "posts"]);
  const projects = getPosts(["src", "app", "work", "projects"]);
  const years = publications.papers.map((paper) => Number(paper.year));

  return [
    {
      card: "home",
      kicker: person.location,
      title: person.name,
      detail: person.role,
    },
    {
      card: "about",
      kicker: about.label,
      title: person.name,
      detail: `${person.role} · ${person.location}`,
    },
    {
      card: "publications",
      kicker: publications.label,
      title: home.sections.papers.title,
      detail: `${publications.papers.length} papers, ${Math.min(...years)} to ${Math.max(...years)}`,
    },
    {
      card: "work",
      kicker: work.label,
      title: work.label,
      detail: projects.map((project) => project.metadata.title).join(" · "),
    },
    {
      card: "blog",
      kicker: blog.label,
      title: home.sections.writing.title,
      detail: posts.map((post) => post.metadata.title).join(" · "),
    },
    {
      card: "gallery",
      kicker: gallery.label,
      title: home.sections.life.title,
      detail: getPoems()
        .map((poem) => poem.title)
        .join(" "),
    },
    ...posts.map((post) => ({
      card: `post-${post.slug}`,
      kicker: home.sections.writing.title,
      title: post.metadata.title,
      detail: formatDate(post.metadata.publishedAt),
    })),
    ...projects.map((project) => ({
      card: `project-${project.slug}`,
      kicker: work.label,
      title: project.metadata.title,
      detail: project.metadata.summary,
    })),
    ...getPoems().map((poem) => ({
      card: `poem-${poem.slug}`,
      kicker: gallery.label,
      title: poem.title,
      photo: poem.imageSrc,
      lines: poem.stanzas[0].split("\n").slice(0, 4),
    })),
  ];
}
