document.addEventListener('DOMContentLoaded', async function () {
    const itemsPerPage = 5;
    let startingValue = 0;
  
    const description = document.createElement('p');
    description.setAttribute('id', 'description');
    description.innerText =
      'Pagination is the method of separating digital content into different pages on a website. Users can navigate between these pages by clicking below Buttons.';
  
    const container = createElement('div', 'class', 'container');
    const maindiv = createElement('div', 'id', 'main-div');
    const navbar = createElement('nav', 'id', 'nav-bar');
    const title = createElement('h1', 'id', 'title');
    title.innerHTML = 'DOM-Pagination task :';
  
    const contentDiv = createElement('div');
    contentDiv.setAttribute('id', 'buttons');
    contentDiv.setAttribute('class', 'd-flex justify-content-center');
  
    const ulList = createElement('ul');
    ulList.classList.add('pagination', 'justify-content-center');
    ulList.setAttribute('id', 'ul-list');
  
    const tableDiv = createTableElement('div');
    tableDiv.setAttribute('class', 'table-responsive');
  
    const tableTag = createTableElement('table');
    tableTag.classList.add('table', 'table-bordered');
  
    const tableBody = createTableElement('tbody');
    tableBody.setAttribute('id', 't-body');
  
    const tableHead = createTableElement('thead');
    tableHead.setAttribute('id', 'table-head');
    const tableRow = createTableElement('tr');
  
    const tableHeader1 = createTableElement('th');
    tableHeader1.innerText = 'Id';
  
    const tableHeader2 = createTableElement('th');
    tableHeader2.innerText = 'Name';
  
    const tableHeader3 = createTableElement('th');
    tableHeader3.innerText = 'Email';
  
    function createElement(tagName, attributeName, attributeValue) {
      const element = document.createElement(tagName);
      element.setAttribute(attributeName, attributeValue);
      return element;
    }
  
    function createTableElement(tagName) {
      const element = document.createElement(tagName);
      return element;
    }
  
    function createButtonElement(
      tagName,
      type,
      buttonClass,
      id,
      buttonText,
      clickHandler
    ) {
      const button = createElement(tagName, 'type', type);
      button.classList.add(buttonClass);
      button.setAttribute('id', id);
      button.innerText = buttonText;
      button.addEventListener('click', clickHandler);
      return button;
    }
  
    function displayContents(numberOfItems) {
      tableBody.innerHTML = '';
  
      for (let i = numberOfItems; i < numberOfItems + itemsPerPage; i++) {
        createTableRow(idArr[i], emailArr[i], nameArr[i]);
      }
    }
  
    function createTableRow(idData, emailData, nameData) {
      const row = createTableElement('tr');
      const td1 = createTableElement('td');
      td1.innerHTML = idData;
      const td2 = createTableElement('td');
      td2.innerHTML = emailData;
      const td3 = createTableElement('td');
      td3.innerHTML = nameData;
  
      tableBody.append(row);
      row.append(td1, td2, td3);
    }
  
    function handleButtonClick(offset) {
      const newStartingValue = startingValue + offset;
      if (newStartingValue >= 0 && newStartingValue <= 30) {
        startingValue = newStartingValue;
        displayContents(startingValue);
      } else {
        alert('Invalid page!');
      }
    }
  
    // Previous Button
    const btnPre = createButtonElement(
      'button',
      'button',
      'btn btn-outline-primary',
      'event-btn-pre',
      '⏪ Previous',
      () => handleButtonClick(-5)
    );
  
    // Next Button
    const btnNext = createButtonElement(
      'button',
      'button',
      'btn btn-outline-primary',
      'event-btn-next',
      'Next ⏩',
      () => handleButtonClick(5)
    );
  
    // First Button
    const btnFirst = createButtonElement(
      'button',
      'button',
      'btn btn-outline-primary',
      'event-btn-first',
      'First',
      () => handleButtonClick(-startingValue)
    );
  
    // Last Button
    const btnLast = createButtonElement(
      'button',
      'button',
      'btn btn-outline-primary',
      'event-btn-last',
      'Last',
      () => handleButtonClick(30 - startingValue)
    );
  
    // Append elements to the document
    document.body.append(container);
    container.append(maindiv);
    maindiv.append(title, description, contentDiv, tableDiv);
    contentDiv.append(navbar);
    navbar.append(ulList);
  
    ulList.append(btnPre, btnFirst, btnNext, btnLast);
  
    tableDiv.append(tableTag);
    tableTag.append(tableHead, tableBody);
    tableHead.append(tableRow);
  
    tableRow.append(tableHeader1, tableHeader2, tableHeader3);
  
    // Fetch data and display initial content
    await paginationData();
  });
  
  async function paginationData() {
    let res = await fetch(
      'https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json'
    );
    let jsonData = await res.json();
  
    try {
      let nameArr = [];
      let emailArr = [];
      let idArr = [];
  
      for (let i = 0; i < 100; i++) {
        let name = jsonData[i].name;
        let email = jsonData[i].email;
        let id = jsonData[i].id;
  
        nameArr.push(name);
        emailArr.push(email);
        idArr.push(id);
      }
  
      // Display initial content
      displayContents(startingValue);
  
      // Event listeners for pagination buttons
      document.getElementById('event-btn-pre').addEventListener('click', () =>
        handleButtonClick(-5)
      );
  
      document.getElementById('event-btn-next').addEventListener('click', () =>
        handleButtonClick(5)
      );
  
      document.getElementById('event-btn-first').addEventListener('click', () =>
        handleButtonClick(-startingValue)
      );
  
      document.getElementById('event-btn-last').addEventListener('click', () =>
      handleButtonClick(-startingValue)
      );
    } catch (error) {
      console.log(error);
    }
  }
  