import './style.css';

import {
  fillUsersSelect,
  fillPosts,
  fillFeaturedPostComments,
  clearPageData,
  fillErrorMessage,
} from './utils/updateUI';

const usersSelect = document.querySelector('#users-select');

const USERS_API = 'https://dummyjson.com/users';
// faça a lógica para pegar as informações das pessoas usuárias e preencher o select aqui.
fetch(USERS_API)
  .then((response) => response.json())
  .then((respon) => fillUsersSelect(respon.users))
  .catch((error) => fillErrorMessage(error.message));

usersSelect.addEventListener('change', () => {
  clearPageData();
  // faça a lógica para pegar as informações dos posts da pessoa selecionada e dos comentários do post destacado aqui.
  const LINK = `https://dummyjson.com/posts/user/${usersSelect.value}`;
  fetch(LINK)
    .then((response) => response.json())
    .then((respos) => {
      fillPosts(respos.posts);
      console.log(respos.posts[0].id);
      const POST_ID = `https://dummyjson.com/posts/${respos.posts[0].id}/comments`;
      return fetch(POST_ID)
        .then((response) => response.json())
        .then((respons) => fillFeaturedPostComments(respons.comments))
        .catch((error) => fillErrorMessage(error.message));
    })
    .catch((error) => fillErrorMessage(error.message));

  // const POST_1 = `https://dummyjson.com/posts/${}`;
});
