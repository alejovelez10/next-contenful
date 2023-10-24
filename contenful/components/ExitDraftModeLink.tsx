"use client";

import React from "react";
import { usePathname } from "next/navigation";

function ExitDraftModeLink(props: React.HTMLProps<HTMLAnchorElement>) {
    const pathname = usePathname();

    return (
        <a href={`/api/disable-draft?redirect=${pathname}`} {...props}>
            Exit
        </a>
    );
}

export default ExitDraftModeLink;
