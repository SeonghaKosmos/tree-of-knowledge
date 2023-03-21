import axios from 'axios';

const ROOT_URL = 'https://us-central1-tok-server-a2b5b.cloudfunctions.net/app'
// const ROOT_URL = 'http://localhost:3001'

export function sendSaveBushPositionsPostReq(bushPositions){
    fetch( ROOT_URL+'/bush-position/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bushPositions)
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
}


export async function sendGetTreeDataGetReq(){

    try{
        const res = await axios.get(ROOT_URL+'/')
        console.log(res.data)
        return [res.data.treeData, res.data.allResources]
    } catch(err) {
      console.log(err)
    }
}

