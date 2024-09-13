import { useEffect, useRef } from 'react';

export default function useSEO({ description, title }) {
    const prevTitle = useRef(document.title);
    const prevDescription = useRef(document.querySelector('meta[name="description"]')?.getAttribute('content'));

    useEffect(() => {
        const previousTitle = prevTitle.current;

        if (title) {
            document.title = title;
        }

        return () => {
            document.title = previousTitle;
        };
    }, [title]);

    useEffect(() => {
        const metaDescription = document.querySelector('meta[name="description"]');
        const previousDescription = prevDescription.current;

        if (metaDescription && description) {
            metaDescription.setAttribute('content', description);
        }

        return () => {
            if (metaDescription) {
                metaDescription.setAttribute('content', previousDescription);
            }
        };
    }, [description]);
}