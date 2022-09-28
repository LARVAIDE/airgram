/**
 * 
 * @param reader 
 * @returns 
 */
const StreamHandle = (reader: any): any => {
    const rb = reader?.getReader()
    return Promise.resolve(new ReadableStream({
        start(controller) {
            function push() {
                rb.read().then(({ done, value }) => {
                    if (done) {
                        controller.close();
                        return;
                    }
                    controller.enqueue(value);
                    push();
                });
            }
            push();
        },
    })).then((stream) =>
        new Response(stream, { headers: { 'Content-Type': 'application/json' } }).text()
    ).then((result) => result);
}

export default StreamHandle