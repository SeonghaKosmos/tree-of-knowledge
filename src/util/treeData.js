import { v4 as uuid } from 'uuid'
import Resource from './Resource'

export const treeData = 
  {
    "name": "Root",
    "id": uuid().replace(/-/g, ''),
    resources: [],
    "children": [
      {
        "name": "Science",
        "id": uuid().replace(/-/g, ''),
        resources: [],
        "children": [
          {
            "name": "Physics",
            "id": uuid().replace(/-/g, ''),
            "resources": [
              new Resource('book phy', uuid(), 'book', 1, []), 
              new Resource('video phy', uuid(), 'video', 2, []), 
              new Resource('course phy', uuid(), 'course', 3, [])]
          },
          {
            "name": "Chemistry",
            "id": uuid().replace(/-/g, ''),
            "resources": [
              new Resource('book chem', uuid(), 'book', 1, []), 
              new Resource('video chem', uuid(), 'video', 2, []), 
              new Resource('course chem', uuid(), 'course', 3, [])],
            "children": [
              {
                "name": "Biology",
                "id": uuid().replace(/-/g, ''),
                "resources": [
                  new Resource('book bio', uuid(), 'book', 3, []), 
                  new Resource('video bio', uuid(), 'video', 2, []), 
                  new Resource('course bio', uuid(), 'course', 1, [])]
              },
              {
                "name": "Geology",
                "id": uuid().replace(/-/g, ''),
                "resources": [
                  new Resource('book geo', uuid(), 'book', 1, []), 
                  new Resource('video geo', uuid(), 'video', 2, []), 
                  new Resource('course geo', uuid(), 'course', 3, [])]
              }
            ]
          },
        ]
      },
      {
        "name": "Humanities",
        "id": uuid().replace(/-/g, ''),
        "resources": [
          new Resource('book hum', uuid(), 'book', 1, []), 
          new Resource('video hum', uuid(), 'video', 2, []), 
          new Resource('course hum', uuid(), 'course', 3, [])],
        "children": [
          {
            "name": "Literature",
            "id": uuid().replace(/-/g, ''),
            "resources": [
              new Resource('book lit', uuid(), 'book', 1, []), 
              new Resource('video lit', uuid(), 'video', 2, []), 
              new Resource('course lit', uuid(), 'course', 3, [])]
          },
          {
            "name": "Philosophy",
            "id": uuid().replace(/-/g, ''),
            "resources": [
              new Resource('book phil', uuid(), 'book', 3, []), 
              new Resource('video phil', uuid(), 'video', 3, []), 
              new Resource('course phil', uuid(), 'course', 2, [])]
          },
          {
            "name": "History",
            "id": uuid().replace(/-/g, ''),
            "resources": [
              new Resource('book hist', uuid(), 'book', 1, []), 
              new Resource('video hist', uuid(), 'video', 1, []), 
              new Resource('course hist', uuid(), 'course', 3, [])]
          } 
        ]
      },
      {
        "name": "Math",
        "id": uuid().replace(/-/g, ''),
        "resources": [
          new Resource('book math', uuid(), 'book', 2, []), 
          new Resource('video math', uuid(), 'video', 3, []), 
          new Resource('course math', uuid(), 'course', 3, [])],
        "children": [
          {
            "name": "Math 1",
            "id": uuid().replace(/-/g, ''),
            "resources": [
              new Resource('book math1', uuid(), 'book', 3, []), 
              new Resource('video math1', uuid(), 'video', 3, []), 
              new Resource('course math1', uuid(), 'course', 3, [])]
          },
          {
            "name": "Geometry",
            "id": uuid().replace(/-/g, ''),
            "resources": [
              new Resource('book geom', uuid(), 'book', 3, []), 
              new Resource('video geom', uuid(), 'video', 2, []), 
              new Resource('course geom', uuid(), 'course', 3, [])]
          }
        ]
      } 
    ]
  }