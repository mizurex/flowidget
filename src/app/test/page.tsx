
async function dem() {

    await new Promise(r=>setTimeout(r,5000));
    return "hellooo"
}

export default async function test (){
    const data = await dem();
    return(
        <div>
            hi there from test {data}
        </div>
    )
}