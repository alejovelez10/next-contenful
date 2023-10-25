import { Metadata, ResolvingMetadata } from "next";
import { draftMode } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import RichText from "../../contenful/RichText";
import StaticTemplate from "../../contenful/components/StaticPage";
import {
    fetchStaticPageTemplate,
    fetchStaticPageTemplates,
} from "../../contenful/staticPageTemplate";

interface StaticPageTemplateParams {
    slug: string;
}

interface StaticPageTemplateProps {
    params: StaticPageTemplateParams;
}

// Tell Next.js about all our blog posts so
// they can be statically generated at build time.
export async function generateStaticParams(): Promise<StaticPageTemplateParams[]> {
    const StaticPageTemplateProps = await fetchStaticPageTemplates({ preview: false });

    return StaticPageTemplateProps.map((post) => ({ slug: post.slug }));
}

// For each blog post, tell Next.js which metadata
// (e.g. page title) to display.
export async function generateMetadata(
    { params }: StaticPageTemplateProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const blogPost = await fetchStaticPageTemplate({
        slug: params.slug,
        preview: draftMode().isEnabled,
    });

    if (!blogPost) {
        return notFound();
    }

    return {
        title: blogPost.pageTitle,
    };
}

// The actual BlogPostPage component.
async function StaticPageTemplate({ params }: StaticPageTemplateProps) {
    // Fetch a single blog post by slug,
    // using the content preview if draft mode is enabled:
    const staticPageTemplate = await fetchStaticPageTemplate({
        slug: params.slug,
        preview: draftMode().isEnabled,
    });

    console.log('draftMode().isEnabled', draftMode().isEnabled)

    if (!staticPageTemplate) {
        // If a blog post can't be found,
        // tell Next.js to render a 404 page.
        return notFound();
    }

    return <StaticTemplate staticPageTemplate={staticPageTemplate} />;
}

export default StaticPageTemplate;
