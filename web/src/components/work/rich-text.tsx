import { PortableText, type PortableTextBlock, type PortableTextComponents } from "next-sanity";
import type { SanityImage as SanityImageType } from "@/sanity/types";
import { SanityImage } from "../ui/sanity-image";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mt-5 leading-[1.85] first:mt-0">{children}</p>,
    h2: ({ children }) => <h2 className="mt-14 font-display text-3xl font-bold tracking-tight first:mt-0">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-10 text-xl font-bold tracking-tight first:mt-0">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="mt-8 border-l-2 border-accent pl-5 text-xl leading-relaxed font-medium">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mt-5 list-disc space-y-2 pl-5 marker:text-accent">{children}</ul>,
    number: ({ children }) => <ol className="mt-5 list-decimal space-y-2 pl-5 marker:font-mono marker:text-muted">{children}</ol>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : "#";
      const external = /^https?:\/\//.test(href);
      return (
        <a
          href={href}
          className="underline decoration-accent underline-offset-4 hover:text-accent"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }: { value: SanityImageType }) => (
      <figure className="my-10">
        <SanityImage image={value} sizes="(min-width: 768px) 720px, 100vw" />
        {value.caption && <figcaption className="mt-3 font-mono text-xs text-muted">{value.caption}</figcaption>}
      </figure>
    ),
  },
};

export function RichText({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}
