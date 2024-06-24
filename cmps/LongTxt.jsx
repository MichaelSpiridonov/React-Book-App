const { useState } = React

export function LongTxt({txt, length = 100}) {

    const [readMore, setReadMore] = useState(false)
    function showMore() {
        setReadMore(!readMore)
    }
    const text = readMore ? txt : txt.slice(0, length)
    return (
        <p>{text}<span className='read-more' onClick={showMore}> {readMore ? 'Read Less...' : ' Read More...'}</span></p>
    )
}