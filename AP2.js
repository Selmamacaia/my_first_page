const form = document.querySelector(".formCreate");
const submitButton = form.querySelector(".btn");
const userList = document.getElementById("userList");

async function fetchCharacterInfo(characterNumber) {
  try {
    const response = await fetch(
      `https://strangerthings-quotes.vercel.app/api/quotes/5${characterNumber}`
    );
    const data = await response.json();
    if (data.error || data === 0) {
      throw new Error("Este personagem não existe");
    }
    const character =data [0];

    const perona = {
      quote: character.quote,
      author: character.author,
    };

    return perona;
  } catch (error) {
    throw new Error(error.message);
  }
}

function create() {
  form.addEventListener("submit", async (event) => {
    event.preventDefault(); 

    const name = document.getElementById("name").value;

    try {
      const character = await fetchCharacterInfo(name);
      console.log(character);
      console.log("Novo usuário criado:", character);
      userList.innerHTML = "";
      const listItem = document.createElement("div");
      listItem.classList.add("userItem");

      const userText = document.createElement("p");
      userText.innerHTML = `<span>Quote:</span> ${character.quote} <br> <span>Author:</span> ${character.author}`;

      listItem.appendChild(userText);
      userList.appendChild(listItem);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      userList.innerHTML = `<p>${error.message}</p>`;
    }
  });
}

create(); 