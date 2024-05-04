import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { Loader, PageHeader } from '@/components';
import { toast } from 'react-hot-toast';
import { OriginalNotes, SummarisedNotes } from '@/components/summariser';

export default function Summariser() {
    const [originalNotes, setOriginalNotes] = useState('');
    const [summarisedNotes, setSummarisedNotes] = useState('');
    const [isNotesInputOpened, toggleNotesInput] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (router.query.transcript) {
            setOriginalNotes(router.query.transcript as string);
        }
    }, [router.query]);

    const summarize = async (notes: string) => {
        if (localStorage.getItem('apiKey') === null) {
            toast.error('Please add your API key in your profile.');
            return;
        }
        setIsLoading(true);
        try {
            const response = await fetch('/api/summary', {
                method: 'POST',
                body: JSON.stringify({ prompt: notes, apiKey: localStorage.getItem('apiKey') }),
                headers: { 'Content-Type': 'application/json' }
            });
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const data = await response.json();
            setSummarisedNotes(data.summary);
            toggleNotesInput(false);
            setIsLoading(false);
        } catch (e) {
            setIsLoading(false);
            toast.error('Something went wrong. Please try again later.');
            console.error(e);
        }
    };

    return (
        <div className="shadow-lg bg-brand-neutral p-4 lg:p-10 mx-12 md:mx-24 lg:mx-48 my-12 rounded-lg text-lg transition hover:scale-105" style={{ backgroundColor: '#FBDFE9' }}>
            <PageHeader title="Summariser" subTitle="We will process the information and summarise everything for you" />
            <div className="px-8 py-5 border-t-2" style={{ borderColor: '#f3c1d3' }}>
                <div className="flex items-center">
                    <h3 className="font-bold text-xl">Your original content</h3>
                    <button onClick={() => toggleNotesInput(!isNotesInputOpened)} className="ml-auto p-1 rounded-full bg-pink-300 hover:bg-pink-400 transition-colors duration-300 ease-in-out">
                        {isNotesInputOpened ? <FaMinus /> : <FaPlus />}
                    </button>
                </div>
                {isNotesInputOpened && (
                    <OriginalNotes
                        originalNotes={originalNotes}
                        setOriginalNotes={setOriginalNotes}
                        summarize={summarize}
                        style={{ backgroundColor: 'white', borderColor: '#EAD2EF', borderWidth: 1 }}
                    />
                )}
            </div>
            <div className="px-8 py-5 border-t-2" style={{ borderColor: '#f3c1d3' }}>
                <h3 className="font-bold text-xl">Summarised content</h3>
                {isLoading ? (
                    <Loader text={'Generating summary...'} />
                ) : (
                    <SummarisedNotes summarisedNotes={summarisedNotes} style={{ backgroundColor: 'white', borderColor: '#EAD2EF', borderWidth: 1 }} />
                )}
            </div>
        </div>
    );
}
