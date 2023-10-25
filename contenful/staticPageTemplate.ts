import { Document as RichTextDocument } from "@contentful/rich-text-types";
import { Entry } from "contentful";
import { ContentImage, parseContentfulContentImage } from "./contentImage";
import contentfulClient from "./contentfulClient";

//import { TypeBlogPostSkeleton } from "./types";

//type staticPageTemplateEntry = Entry<TypeBlogPostSkeleton, undefined, string>;

// Our simplified version of a BlogPost.
// We don't need all the data that Contentful gives us.
export interface staticPageTemplate {
    pageTitle: string;
    slug: string;
    content: RichTextDocument | null;
    image: ContentImage | null;
    sys: any;
}

// A function to transform a Contentful blog post
// into our own BlogPost object.
export function parseContentfulStaticPageTemplate(
    staticPageTemplateEntry?: any
): staticPageTemplate | null {
    if (!staticPageTemplateEntry) {
        return null;
    }

    return {
        pageTitle: staticPageTemplateEntry.fields.pageTitle || "",
        slug: staticPageTemplateEntry.fields.slug,
        content: staticPageTemplateEntry.fields.content || null,
        image: parseContentfulContentImage(staticPageTemplateEntry.fields.image),
        sys: staticPageTemplateEntry.sys,
    };
}

// A function to fetch all static page Templates.
// Optionally uses the Contentful content preview.
interface FetchStaticPageTemplatesOptions {
    preview: boolean;
}
export async function fetchStaticPageTemplates({
    preview,
}: FetchStaticPageTemplatesOptions): Promise<staticPageTemplate[]> {
    const contentful = contentfulClient({ preview });

    const staticPageTemplateResult = await contentful.getEntries<any>({
        content_type: "staticPageTemplate",
        include: 2,
        order: ["fields.pageTitle"],
    });

    return staticPageTemplateResult.items.map(
        (staticPageTemplateEntry: any) =>
            parseContentfulStaticPageTemplate(staticPageTemplateEntry) as staticPageTemplate
    );
}

// A function to fetch a single blog post by its slug.
// Optionally uses the Contentful content preview.
interface FetchStaticPageTemplateOptions {
    slug: string;
    preview: boolean;
}
export async function fetchStaticPageTemplate({
    slug,
    preview,
}: FetchStaticPageTemplateOptions): Promise<staticPageTemplate | null> {
    const contentful = contentfulClient({ preview });

    const staticPageTemplateResult = await contentful.getEntries<any>({
        content_type: "staticPageTemplate",
        "fields.slug": slug,
        include: 2,
    });

    return parseContentfulStaticPageTemplate(staticPageTemplateResult.items[0]);
}
