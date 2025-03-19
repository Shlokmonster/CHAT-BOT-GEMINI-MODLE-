document.addEventListener('DOMContentLoaded', (event) => {
    let input = document.getElementById("user-input");
    let ChatContainer = document.querySelector(".text-container"); 
    let sendButton = document.getElementById("send-btn");
  
    let user =[
        {
            data:"null",


        }
    ]
const GOOGLE_API_KEY="(YOUR_API_KEY)"
    const Url=`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GOOGLE_API_KEY}`


 async function genrateRespone(botChatbox) {


    let text=botChatbox.querySelector("#bt-me")



    let requestOption ={
        method :"POST",
        headers : {'Content-Type' : 'application/json'},
        body:JSON.stringify({
            "contents": [{
        "parts":[{"text":user.data}]
        }
    ]
        }
    )

    }
    try{
        let response =  await fetch(Url , requestOption)
        let data=  await response.json();
        let apiresponse = data.candidates[0].content.parts[0].text.replace(/\*\*([^*]*)\*\*/g, '$1').trim();
        text.innerHTML=apiresponse

        }
        catch(error){
            console.log(error);
    
    
        }
}


    let CreateChatbox = (html, classes) => {
      let div = document.createElement("div");
      div.innerHTML = html;
      div.classList.add(classes);
      return div;
    };
  

    let UserChatbox = (message) => {
        // Use template literals for HTML strings
        user.data=message;
        let html = ` 
          <div class="user-message">
            <p>
              <img src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png" alt="" height="60px" width="60px">
            </p>
            <p id="us-me">
              ${user.data}
            </p>
          </div> 
        `;
        let userChatbox = CreateChatbox(html, "user-message");
        ChatContainer.appendChild(userChatbox);
      

      
        setTimeout(() => {
          let html = ` 
            <div class="bots-message">
              <p id="bt-me">
         <img src="https://media1.giphy.com/media/XfDiixCqdH7OrEBg5z/200.webp?cid=ecf05e472ftin3kqu70sv42encp4lloup2nvupesvdkjk4nv&ep=v1_gifs_search&rid=200.webp&ct=g" alt="" class="load" height="100px" >
              </p>
              <p>
                <img src="https://cdn-icons-png.flaticon.com/128/14958/14958196.png" alt="" height="60px" width="60px">
              </p>
            </div>
          `;
          let botChatbox = CreateChatbox(html, "bots-message");
          ChatContainer.appendChild(botChatbox);
          genrateRespone(botChatbox);
        }, 5000);
      };
      

  
//  event for enter
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        UserChatbox(input.value);
        // Clear the input field after sending the message
        input.value = "";
      }
    });
  
    // Adding click event to the send button
    sendButton.addEventListener("click", () => {
      UserChatbox(input.value);
      input.value = ""; 
    });
  });
  
