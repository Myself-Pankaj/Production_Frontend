// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { AnimatePresence, motion } from 'framer-motion'
import MessageDisplay from '../Error/messageDisplay'
import messages from '../../__constants__/messages'
import StylishLoader from '../loader/StylishLoader'

const DocumentPreview = ({ documents, isLoading, DocName, showDocument, toggleShowDocument }) => {
    if (!documents) {
        return <MessageDisplay message={messages.NO_DOC_FOUND} />
    }
    if (isLoading) {
        return (
            <StylishLoader
                size="large"
                color="yellow"
            />
        )
    }

    return (
        <div className="admin_driver_documents">
            <h2>Documents</h2>
            {documents.map((document, index) => (
                <div
                    key={document._id}
                    className="admin_driver_document">
                    <p>{DocName[index]}</p>
                    <a
                        href={document.url}
                        target="_blank"
                        rel="noopener noreferrer">
                        Download
                    </a>
                    <button onClick={() => toggleShowDocument(document._id)}>{showDocument === document._id ? 'Hide' : 'Show'}</button>
                    <AnimatePresence>{showDocument === document._id && <Document document={document} />}</AnimatePresence>
                </div>
            ))}
        </div>
    )
}
DocumentPreview.propTypes = {
    documents: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired
        })
    ).isRequired,
    isLoading: PropTypes.bool.isRequired,
    DocName: PropTypes.arrayOf(PropTypes.string).isRequired,
    showDocument: PropTypes.string,
    toggleShowDocument: PropTypes.func.isRequired
}
export default DocumentPreview

const Document = ({ document }) => {
    const isPDF = document.url.toLowerCase().endsWith('.pdf')

    return (
        <motion.div
            className="document-preview"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}>
            {isPDF ? (
                <embed
                    src={document.url}
                    type="application/pdf"
                    width="100%"
                    height="300px"
                />
            ) : (
                <img
                    src={document.url}
                    alt={`${document.docName} preview`}
                    style={{ maxWidth: '100%', height: 'auto' }}
                />
            )}
        </motion.div>
    )
}

Document.propTypes = {
    document: PropTypes.shape({
        url: PropTypes.string.isRequired,
        docName: PropTypes.string.isRequired
    }).isRequired
}
