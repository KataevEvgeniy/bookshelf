# Book Catalog

This is a Single Page Application (SPA) for a Book Catalog, implemented using React and Firestore.

## Features

1. All book data is stored using Firestore and the corresponding SDK.
2. The main page displays a list of all books available in the system.
3. Books are grouped by publication year, with groups sorted in descending order (newest first). Within each group, books are sorted by title.
4. Books can be added and deleted.
5. The system recommends a good book to read, based on the following criteria:
    - The book must have been published at least 3 years ago.
    - From all the books that meet the above criteria, the ones with the highest rating are selected.
    - If there are multiple books with the highest rating, one is chosen randomly.

## Book Fields

- Title (required, no more than 100 characters)
- List of authors (at least one author is required)
- Publication year (optional, not earlier than 1800)
- Rating (optional, an integer from 0 to 10, default is 0)
- ISBN (optional)

## Additional Features

1. ISBN validation.
2. Change of grouping mode (by rating, by author).
3. Editing of books.

All the requirements of the task have been met.