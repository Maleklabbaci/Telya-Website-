
import React from 'react';

const CheckIcon = () => (
    <svg className="w-5 h-5 text-white" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.485 3.43l-7.928 7.928-3.535-3.536" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
);

const CrossIcon = () => (
     <svg className="w-5 h-5 text-white" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4l8 8m0-8l-8 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
);

const BrowserIcon = () => (
    <svg className="w-20 h-20 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
        <line x1="2" y1="8" x2="22" y2="8" />
        <path d="M5 6h.01" />
        <path d="M8 6h.01" />
    </svg>
);

const CloudIcon = () => (
     <svg className="w-20 h-20 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    </svg>
);

const ServerIcon = () => (
    <svg className="w-20 h-20 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
);


const Contact: React.FC = () => {
    return (
        <section id="contact" className="font-sans text-gray-700 bg-white py-20">
            <div className="container mx-auto px-6">
                 <div className="border-b border-gray-200 pb-8">
                    <div className="flex items-center flex-wrap">
                        <h1 className="text-4xl md:text-5xl text-gray-800 font-light mr-4">Web server is down</h1>
                        <span className="bg-gray-200 text-gray-600 text-sm font-medium px-2 py-1 rounded-md mt-2 sm:mt-0">Error code 521</span>
                    </div>
                    <p className="mt-4 text-base md:text-lg text-gray-600">Visit <a href="https://www.cloudflare.com/5xx-error-landing/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">cloudflare.com</a> for more information.</p>
                    <p className="mt-2 text-sm text-gray-500">2025-11-16 14:28:47 UTC</p>
                </div>

                <div className="relative bg-gray-50 border-b border-t border-gray-200 mt-8">
                    <div className="container mx-auto px-6 py-12">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
                            {/* You */}
                            <div className="flex flex-col items-center pt-8 md:pt-0">
                                <div className="relative mb-4">
                                    <BrowserIcon />
                                    <div className="absolute -bottom-2 -right-1 bg-green-500 rounded-full p-1.5 border-4 border-gray-50">
                                        <CheckIcon />
                                    </div>
                                </div>
                                <h2 className="text-lg font-semibold text-gray-800">You</h2>
                                <p className="text-gray-400 text-2xl font-light">Browser</p>
                                <p className="text-green-500 font-semibold text-xl">Working</p>
                            </div>

                            {/* Cloudflare */}
                            <div className="flex flex-col items-center pt-8 md:pt-0 md:pl-8">
                                <div className="relative mb-4">
                                    <CloudIcon />
                                    <div className="absolute -bottom-2 -right-1 bg-green-500 rounded-full p-1.5 border-4 border-gray-50">
                                        <CheckIcon />
                                    </div>
                                </div>
                                <h2 className="text-lg font-semibold text-gray-800">Rome</h2>
                                <p className="text-blue-600 text-2xl font-light">Cloudflare</p>
                                <p className="text-green-500 font-semibold text-xl">Working</p>
                            </div>
                            
                            {/* Host */}
                            <div className="flex flex-col items-center pt-8 md:pt-0 md:pl-8">
                                <div className="relative mb-4">
                                    <ServerIcon />
                                    <div className="absolute -bottom-2 -right-1 bg-red-500 rounded-full p-1.5 border-4 border-gray-50">
                                        <CrossIcon />
                                    </div>
                                </div>
                                <h2 className="text-lg font-semibold text-gray-800">telyaagency.com</h2>
                                <p className="text-gray-400 text-2xl font-light">Host</p>
                                <p className="text-red-500 font-semibold text-xl">Error</p>
                            </div>
                        </div>
                    </div>
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-t-[16px] border-t-gray-50"></div>
                </div>
            
                <div className="pt-16">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        <div>
                            <h3 className="text-2xl text-gray-800 font-light mb-4">What happened?</h3>
                            <p className="text-base leading-relaxed text-gray-600">The web server is not returning a connection. As a result, the web page is not displaying.</p>
                        </div>
                        <div>
                            <h3 className="text-2xl text-gray-800 font-light mb-4">What can I do?</h3>
                            <p className="text-base leading-relaxed text-gray-600"><strong>If you are a visitor of this website:</strong></p>
                            <p className="text-base leading-relaxed text-gray-600 mt-2">Please try again in a few minutes.</p>
                        </div>
                     </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
