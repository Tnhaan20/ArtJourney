import{c as g,r as C,e as b,j as e,f as w,B as n,V as u,T as c,d as N}from"./index-zaywA27-.js";import{C as k}from"./Completed-d2OgkXlU.js";import{B as d}from"./button-CoaaZqfp.js";import{A as z}from"./arrow-left-CxLdMvr9.js";/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",key:"1yiouv"}],["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}]],y=g("award",A);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=[["path",{d:"M12 20h9",key:"t2du7b"}],["path",{d:"M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",key:"1ykcvy"}]],x=g("pen-line",I);function E({moduleId:l,courseId:a,onBack:o}){var p;const[i,f]=C.useState("introduction"),m=b(),r={title:"Early Christian Art",sections:[{id:"introduction",title:"Introduction to Early Christian Art",type:"reading",completed:!0,hasCompletionButton:!0,content:`
          <p class="mb-4">Early Christian art, also called Paleo-Christian art or primitive Christian art, architecture, painting, and sculpture from the beginnings of Christianity until about the early 6th century, particularly the art of Italy and the western Mediterranean.</p>
          
          <p class="mb-4">The earliest identifiably Christian art consists of a few 2nd-century wall and ceiling paintings in the Roman catacombs (underground burial chambers), which continued to be decorated in a sketchy style derived from Roman impressionism through the 4th century.</p>
        `},{id:"characteristics",title:"Key Characteristics",type:"reading",completed:!1,hasCompletionButton:!0,content:`
          <ul class="list-disc pl-6 mb-4">
            <li>Adaptation of Roman artistic forms</li>
            <li>Use of symbolism rather than direct representation</li>
            <li>Focus on salvation themes</li>
            <li>Avoidance of idolatry concerns</li>
          </ul>
        `},{id:"important-works",title:"Important Works",type:"video",completed:!1,hasCompletionButton:!0,content:`
          <div class="mb-6">
            <div class="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
              <p class="text-gray-500">Video player would be embedded here</p>
            </div>
          </div>
          <p class="mb-4">The Good Shepherd, the Orant, and the story of Jonah were among the most popular motifs. The earliest Christian iconography tended to be symbolic. A simple rendering of a fish was sufficient to allude to Christ.</p>
          
          <p class="mb-4">The Catacombs of Rome contain most of the surviving examples of early Christian art. The Dura-Europos church in Syria is the oldest surviving church building, while the Dura-Europos house church contains the oldest surviving Christian paintings.</p>
        `},{id:"module-quiz",title:"Knowledge Check Quiz",type:"quiz",completed:!1,hasCompletionButton:!1,content:`
          <div class="bg-amber-50 p-4 rounded-lg border border-amber-100 mb-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Test Your Understanding</h3>
            <p class="mb-4">This quiz contains 5 questions about Early Christian Art. Complete this quiz to check your understanding of the key concepts covered in this module.</p>
            <p class="text-sm text-gray-600 mb-4">
              <strong>Time:</strong> 10 minutes<br>
              <strong>Passing Score:</strong> 80%
            </p>
            <div class="bg-white p-4 rounded border border-gray-200 mb-4">
              <p class="font-medium">Sample Question:</p>
              <p class="text-gray-700 mb-2">Which of the following was a common symbol in Early Christian Art?</p>
              <ul class="list-disc pl-6">
                <li>Fish (Ichthys)</li>
                <li>Eagle</li>
                <li>Lion</li>
                <li>Dragon</li>
              </ul>
            </div>
          </div>
        `},{id:"module-challenge",title:"Art Analysis Challenge",type:"challenge",completed:!1,hasCompletionButton:!1,content:`
          <div class="bg-amber-50 p-4 rounded-lg border border-amber-100 mb-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Practice Challenge</h3>
            <p class="mb-4">Test your ability to analyze Early Christian artwork by identifying symbols, themes, and techniques in various examples.</p>
            <p class="text-sm text-gray-600 mb-4">
              <strong>Difficulty:</strong> Intermediate<br>
              <strong>Estimated Time:</strong> 20 minutes
            </p>
            <p class="mb-2">In this challenge, you'll:</p>
            <ul class="list-disc pl-6 mb-4">
              <li>Analyze 3 different pieces of Early Christian art</li>
              <li>Identify key symbols and their meanings</li>
              <li>Explain the historical context of each artwork</li>
              <li>Compare techniques used across different examples</li>
            </ul>
          </div>
        `}],duration:45,difficulty:"Intermediate"},v=t=>{alert(`Section "${t}" marked as complete!`)},j=((p=r.sections.find(t=>t.id===i))==null?void 0:p.content)||"",s=r.sections.find(t=>t.id===i),h=t=>{t==="quiz"?m(`/quiz/course/${a}/module/${l}`):t==="challenge"&&m(`/challenge/course/${a}/module/${l}`)};return e.jsxs("div",{className:"flex flex-col lg:flex-row bg-white rounded-lg shadow-md overflow-hidden",children:[e.jsxs("div",{className:"lg:w-1/4 border-r border-gray-200",children:[e.jsxs("div",{className:"bg-amber-50 p-4 border-b border-amber-100",children:[e.jsxs("button",{onClick:o,className:"flex items-center text-[var(--color-primary-yellow)] hover:text-[var(--color-secondary-yellow)] mb-2",children:[e.jsx(z,{size:16,className:"mr-1"}),e.jsx("span",{children:"Back to Course"})]}),e.jsx("h1",{className:"text-lg font-bold text-[var(--color-primary-yellow)]",children:r.title})]}),e.jsxs("div",{className:"p-4 border-b border-gray-200 text-sm text-gray-600",children:[e.jsxs("div",{className:"flex items-center mb-2",children:[e.jsx(w,{size:16,className:"mr-2 text-[var(--color-primary-yellow)]"}),e.jsxs("span",{children:[r.duration," minutes"]})]}),e.jsxs("div",{className:"flex items-center",children:[e.jsx(n,{size:16,className:"mr-2 text-[var(--color-primary-yellow)]"}),e.jsxs("span",{children:["Difficulty: ",r.difficulty]})]})]}),e.jsxs("div",{className:"p-2",children:[e.jsx("h3",{className:"px-2 py-1 text-sm font-medium text-gray-500 uppercase",children:"Module Content"}),e.jsx("nav",{className:"mt-2",children:r.sections.map(t=>e.jsxs("button",{onClick:()=>{f(t.id)},className:`w-full text-left px-4 py-3 flex items-center ${i===t.id?"bg-amber-50 text-[var(--color-primary-yellow)] border-l-2 border-[var(--color-primary-yellow)]":"text-gray-700 hover:bg-gray-50"}`,children:[e.jsx("div",{className:"mr-2",children:e.jsx(k,{isCompleted:t.completed,size:16})}),e.jsx("div",{className:"mr-2 text-[var(--color-primary-yellow)]",children:t.type==="reading"?e.jsx(n,{size:16}):t.type==="video"?e.jsx(u,{size:16}):t.type==="quiz"?e.jsx(x,{size:16}):e.jsx(y,{size:16})}),e.jsx("span",{children:t.title})]},t.id))})]})]}),e.jsxs("div",{className:"lg:w-3/4",children:[e.jsx("div",{className:"bg-white p-6 border-b border-gray-200",children:e.jsxs("div",{className:"flex items-center",children:[(s==null?void 0:s.type)==="reading"?e.jsx(n,{size:20,className:"mr-3 text-[var(--color-primary-yellow)]"}):(s==null?void 0:s.type)==="video"?e.jsx(u,{size:20,className:"mr-3 text-[var(--color-primary-yellow)]"}):(s==null?void 0:s.type)==="quiz"?e.jsx(x,{size:20,className:"mr-3 text-[var(--color-primary-yellow)]"}):e.jsx(y,{size:20,className:"mr-3 text-[var(--color-primary-yellow)]"}),e.jsx("h2",{className:"text-xl font-bold text-gray-800",children:s==null?void 0:s.title})]})}),e.jsxs("div",{className:"p-6",children:[e.jsx("div",{dangerouslySetInnerHTML:{__html:j}}),e.jsxs("div",{className:"mt-8",children:[(s==null?void 0:s.type)==="quiz"&&e.jsx(d,{onClick:()=>h("quiz"),className:`${c.HIGHLIGHT_FRAME} px-6 py-2 rounded-md`,children:"Start Quiz"}),(s==null?void 0:s.type)==="challenge"&&e.jsx(d,{onClick:()=>h("challenge"),className:`${c.HIGHLIGHT_FRAME} px-6 py-2 rounded-md`,children:"Begin Challenge"}),(s==null?void 0:s.hasCompletionButton)&&e.jsx(d,{onClick:()=>v(s.id),className:`${c.HIGHLIGHT_FRAME} px-6 py-2 rounded-md`,children:"Mark as Complete"})]})]})]})]})}function $(){const{courseId:l,moduleId:a}=N(),o=b(),i=()=>{o(`/learn/course/${l}`)};return e.jsx("div",{className:"w-full px-4",children:e.jsx("div",{className:"max-w-7xl mx-auto flex flex-col gap-6",children:e.jsx(E,{moduleId:parseInt(a),courseId:l,onBack:i})})})}export{$ as default};
