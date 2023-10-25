"use client";

import React from "react";
import Link from "next/link";
import { ContentfulLivePreviewProvider } from "@contentful/live-preview/react";
import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import RichText from "../RichText";
import Container from "./Container";

function StaticPage({ staticPageTemplate, draftMode } : any) {
    console.log("draftMode", draftMode)
    return (
        <ContentfulLivePreviewProvider
        locale="en-US"// Required: allows you to set the locale once and have it reused throughout the preview.
        enableInspectorMode={false} // Optional: allows you to toggle inspector mode which is on by default.
        enableLiveUpdates={true} // Optional: allows you to toggle live updates which are on by default.
        debugMode={false} // Optional: allows you to toggle debug mode which is off by default.
      >
            <Container staticPageTemplate={staticPageTemplate} />
            
            
        </ContentfulLivePreviewProvider>
    );
}

export default StaticPage;
