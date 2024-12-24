"use client"

import { useParams } from "next/navigation";

export default function() {
    const params = useParams();
    console.log(params)

    // param.slug ->This might be a string or an array of strings

    return (
        <div>
            <p>Dynamic Slug: {Array.isArray(params.slugs) ? (params.slugs).join(" / ") : "No slug provided"}</p>
        </div>
    )
}