/*!
 * CustomAlert.js - A simple and powerful JavaScript alert system
* Author: Rajkumar Nimod
 * Website: https://rajkumarnimod.github.io/changealert/
 * Version: 1.0.0
 * License: MIT
 */
/* Please retain this header when using or modifying the file */


const toastSounds={success:"https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg",error:"https://actions.google.com/sounds/v1/alarms/beep_short.ogg",warning:"https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg",info:"https://actions.google.com/sounds/v1/cartoon/pop.ogg"},ChangeAlert=(()=>{let e={},t={type:"info",position:"top-right",timeout:3e3,icon:null,closeButton:!0,animation:"fade",theme:"light",onClick:null,onClose:null,sound:void 0,pauseOnHover:!0};function o(t){if(e[t])return e[t];let o=document.createElement("div");return o.className=`toast-container ${t}`,document.body.appendChild(o),e[t]=o,o}function n(e){return({success:"✅",error:"❌",warning:"⚠️",info:"ℹ️"})[e]||"ℹ️"}function s(e,s,a){let c={...t,..."object"==typeof s?s:a||{},type:"string"==typeof s?s:"info",message:e},i=o(c.position);"dark"===c.theme?document.documentElement.setAttribute("data-theme","dark"):document.documentElement.setAttribute("data-theme","light");let l=document.createElement("div");if(l.className=`toast ${c.type}`,l.innerHTML=`
      <span class="icon">${c.icon||n(c.type)}</span>
      <span class="message">${c.message}</span>
      ${c.closeButton?'<span class="close-btn">&times;</span>':""}
    `,c.sound){if("string"==typeof c.sound)try{let r=new Audio(c.sound);r.play().catch(e=>console.warn("Custom sound failed:",e))}catch(u){console.warn("Invalid custom sound:",u)}else if(toastSounds[c.type])try{let d=new Audio(toastSounds[c.type]);d.play().catch(e=>console.warn("Default sound failed:",e))}catch(p){console.warn("Error playing default sound:",p)}}let m=setTimeout(()=>g(),c.timeout);function g(){l.remove(),c.onClose?.()}c.pauseOnHover&&(l.addEventListener("mouseenter",()=>clearTimeout(m)),l.addEventListener("mouseleave",()=>{m=setTimeout(g,c.timeout)})),c.closeButton&&(l.querySelector(".close-btn").onclick=g),l.onclick=()=>{c.onClick?.()},i.appendChild(l)}return{show:s,success:(e,t={})=>s(e,"success",t),error:(e,t={})=>s(e,"error",t),warning:(e,t={})=>s(e,"warning",t),info:(e,t={})=>s(e,"info",t)}})();
