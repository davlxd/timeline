import React from 'react'
import Paper from 'material-ui/Paper'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import './style.css'

const Gallery = () => (
   <div>
     <MuiThemeProvider>
       <div className="GalleryContainer">
         <Paper className="GalleryItem">
           <img src={process.env.PUBLIC_URL + '/gallery/project2.png'} alt="Project Template"></img>
           <a href="/line/c142e91778da487280c8ceb7c716535b">
             <div className="GalleryItemVeil"><span>Project Template</span></div>
           </a>
         </Paper>

         <Paper className="GalleryItem">
           <img src={process.env.PUBLIC_URL + '/gallery/self.png'} alt="Timelink.ink"></img>
           <a href="/line/81780cfe11f042178e32d26ad7fc0150">
             <div className="GalleryItemVeil"><span>Timelink.ink</span></div>
           </a>
         </Paper>

        <Paper className="GalleryItem">
          <img src={process.env.PUBLIC_URL + '/gallery/ww2.png'} alt="World War 2"></img>
          <a href="/line/90bd046febaa4e2f8ae10585deb203fa">
            <div className="GalleryItemVeil"><span>World War 2</span></div>
          </a>
        </Paper>

         <Paper className="GalleryItem">
           <img src={process.env.PUBLIC_URL + '/gallery/illustration.png'} alt="Illustration"></img>
           <a href="/line/e4a7219aaa5043be9471552b68d44f12">
             <div className="GalleryItemVeil"><span>Illustration</span></div>
           </a>
         </Paper>

         <Paper className="GalleryItem">
           <img src={process.env.PUBLIC_URL + '/gallery/project.png'} alt="Project Template 2"></img>
           <a href="/line/3f27e531c2f24a1092a4b59c60440621">
             <div className="GalleryItemVeil"><span>Project Template 2</span></div>
           </a>
         </Paper>

       </div>
     </MuiThemeProvider>
   </div>
)

export default Gallery
