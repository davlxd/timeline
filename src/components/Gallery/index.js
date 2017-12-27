import React from 'react'
import Paper from 'material-ui/Paper'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import './style.css'

const Gallery = () => (
   <div>
     <MuiThemeProvider>
       <div className="GalleryContainer">
         <Paper className="Picture">
           <img src={process.env.PUBLIC_URL + '/gallery/project2.png'}></img>
           <a href="/view/c142e91778da487280c8ceb7c716535b">
             <div className="Veil"><span>Project Template</span></div>
           </a>
         </Paper>

         <Paper className="Picture">
           <img src={process.env.PUBLIC_URL + '/gallery/self.png'}></img>
           <a href="/line/c85ddc2daf114c9499e4dc5519cec88c">
             <div className="Veil"><span>Timelink.ink</span></div>
           </a>
         </Paper>

        <Paper className="Picture">
          <img src={process.env.PUBLIC_URL + '/gallery/ww2.png'}></img>
          <a href="/line/90bd046febaa4e2f8ae10585deb203fa">
            <div className="Veil"><span>World War 2</span></div>
          </a>
        </Paper>

         <Paper className="Picture">
           <img src={process.env.PUBLIC_URL + '/gallery/illustration.png'}></img>
           <a href="/line/e4a7219aaa5043be9471552b68d44f12">
             <div className="Veil"><span>Illustration</span></div>
           </a>
         </Paper>

         <Paper className="Picture">
           <img src={process.env.PUBLIC_URL + '/gallery/project.png'}></img>
           <a href="/line/3f27e531c2f24a1092a4b59c60440621">
             <div className="Veil"><span>Project Template 2</span></div>
           </a>
         </Paper>

       </div>
     </MuiThemeProvider>
   </div>
)

export default Gallery
