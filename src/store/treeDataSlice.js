import {createSlice } from '@reduxjs/toolkit'
import Resource from '../util/Resource';
import { treeData } from '../util/treeData'


const initialState = treeData

const treeDataSlice = createSlice({
    name:'treeData',
    initialState
})


function getRandomSubarray(arr, size) {
  var shuffled = arr.slice(0), i = arr.length, temp, index;
  while (i--) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
  }
  return shuffled.slice(0, size);
}

for (let resource of Resource.allCreatedResources){
  resource.connections = getRandomSubarray(Resource.allCreatedResources, Math.floor(Math.random()*10))
}

export default treeDataSlice