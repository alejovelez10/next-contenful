import { createClient } from "contentful";

const CONTENTFUL_SPACE_ID = "f2jjecr5anjv";
const CONTENTFUL_ACCESS_TOKEN = "dy-WeWiLV_mEauVB99Ci5MbSHjoJeblFb1WBKHEoMq8";
const CONTENTFUL_PREVIEW_ACCESS_TOKEN = "U3QMvSOhg8R5EGxmNxe9Yf1T8zLXeHVBarR2CFqteGQ";

// This is the standard Contentful client. It fetches
// content that has been published.
const client = createClient({
    space: CONTENTFUL_SPACE_ID!,
    accessToken: CONTENTFUL_ACCESS_TOKEN!,
});

// This is a Contentful client that's been configured
// to fetch drafts and unpublished content.
const previewClient = createClient({
    space: CONTENTFUL_SPACE_ID!,
    accessToken: CONTENTFUL_PREVIEW_ACCESS_TOKEN!,
    host: "preview.contentful.com",
});

// This little helper will let us switch between the two
// clients easily:
export default function contentfulClient({ preview = false }) {
    if (preview) {
        return previewClient;
    }

    return client;
}
