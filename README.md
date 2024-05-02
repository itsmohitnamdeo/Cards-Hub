# Cards-Hub
This project implements a simple API to model the backend functionality using Django REST Framework (DRF). The frontend is developed using ReactJS, providing an interactive user interface for managing columns and cards within a board.

## Features

- **Column Management**: Define and update columns within a board.
- **Card Management**: Define and update cards within each column, with support for reordering.
- **Add Card**: Allows users to add cards to a selected column, with validation for title and description.
- **Edit Card**: Allows users to edit existing cards, with the ability to change the column and move the card accordingly.
- **Delete Card**: Enables users to delete cards from any column within the board.

### Features

- 3 column lists with multiple cards in each
- Maintained state after refresh
- Button to add new cards
- Drag and drop functionality to move cards between columns

#### Add Card

- Clicking the "Add Card" button opens a modal popup with a form.
- Form includes fields for title, description, and column selection dropdown.
- Title validation ensures only alphabets are used.
- Description validation enforces a minimum length of 25 characters.
- On submission, the card is added to the end of the selected column.

#### Edit Card

- Clicking a card opens the modal popup with prefilled data for editing.
- Delete button is available in the popup to remove the card.

## Contact

If you have any questions, suggestions, or need assistance related to the CMS-Server, feel free to reach out to Me.

- MailId - namdeomohit198@gmail.com
- Mob No. - 9131552292
- Portfolio: [https://itsmohitnamdeo.github.io](https://itsmohitnamdeo.github.io)
- Linkedin: [https://www.linkedin.com/in/mohit-namdeo](https://www.linkedin.com/in/mohit-namdeo)
