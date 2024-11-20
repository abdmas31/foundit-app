import React from 'react';

function ContactModal({ post, onClose }) {
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Contact Information</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500"
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="mt-4">
                    <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-500">Post Title</h4>
                        <p className="text-gray-900">{post.title}</p>
                    </div>

                    <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-500">Posted By</h4>
                        <p className="text-gray-900">{post.userName}</p>
                    </div>

                    <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-500">Phone Number</h4>
                        <p className="text-gray-900">{post.userPhone}</p>
                    </div>

                    <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-500">Email</h4>
                        <p className="text-gray-900">{post.userEmail}</p>
                    </div>

                    <div className="mt-6">
                        <button
                            onClick={onClose}
                            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactModal;
