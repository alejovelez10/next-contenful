"use client";

import React from "react";
import Link from "next/link";
import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import { useContentfulInspectorMode } from "@contentful/live-preview/react";
import RichText from "../RichText";
import { ContentfulLivePreview } from '@contentful/live-preview';

function Container({ staticPageTemplate } : any) {
    const inspectorProps = useContentfulInspectorMode({ entryId: staticPageTemplate.sys.id });

    const updatedEntries = useContentfulLiveUpdates(staticPageTemplate);
    console.log(updatedEntries,"sfasfd")

    return (
        <main className="p-[6vw]">
            <div className="prose mt-8 border-t pt-8">
                {/* Render the blog post image */}
                {updatedEntries.image && (
                    <img

                    {...inspectorProps({ fieldId: "iamge" })}
                        src={updatedEntries.image.src}
                        // Use the Contentful Images API to render
                        // responsive images. No next/image required:
                        srcSet={`${updatedEntries.image.src}?w=300 1x, ${updatedEntries.image.src} 2x`}
                        width={300}
                        height={300}
                        alt={updatedEntries.image.alt}
                    />
                )}

                {/* Render the blog post title */}
                <h1>{updatedEntries.pageTitle}</h1>

                {/* Render the blog post body */}
                <div {...inspectorProps({ fieldId: "content" })}><RichText  document={updatedEntries.content} /></div>
            </div>
        </main>
    );
}

export default Container;
