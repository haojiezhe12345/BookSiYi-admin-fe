function i(e){var r=JSON.parse(JSON.stringify(e));r[1]--;var t=r[0];return r.splice(0,1),new Date(Date.UTC(t,...r)).toISOString().slice(0,19)}function n(e){try{var r=JSON.parse(JSON.stringify(e));r[1]--;var t=r[0];return r.splice(0,1),new Date(Date.UTC(t,...r)).toISOString().slice(0,19).replace("T"," ")}catch{return"error"}}export{i as a,n as t};