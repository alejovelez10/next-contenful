import Image from 'next/image'
import Link from "next/link";
import { draftMode } from "next/headers";
import { fetchStaticPageTemplates } from "../contenful/staticPageTemplate";

export default async function Home() {
    const staticPageTemplates = await fetchStaticPageTemplates({ preview: draftMode().isEnabled });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="prose py-4">
                <h1>My static web pages</h1>
                <ul>
                    {staticPageTemplates.map((staticPageTemplate) => {
                        return (
                            <li key={staticPageTemplate.slug}>
                                <Link href={`/${staticPageTemplate.slug}`}>
                                    {staticPageTemplate.pageTitle}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
    </main>
  )
}
