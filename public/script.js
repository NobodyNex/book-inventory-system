const API_URL = 'http://localhost:3000'; // URL ของ API

// ฟังก์ชันสำหรับการเพิ่มหนังสือ
document.getElementById('addBookBtn').addEventListener('click', async () => {
    const bookData = {
        title: document.getElementById('addTitle').value,
        author: document.getElementById('addAuthor').value,
        genre: document.getElementById('addGenre').value,
        publishedYear: parseInt(document.getElementById('addPublishedYear').value),
        isAvailable: document.getElementById('addIsAvailable').checked,
    };

    const response = await fetch(`${API_URL}/books`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
    });

    const result = await response.json();
    alert(`Added Book: ${JSON.stringify(result)}`);
});

// ฟังก์ชันสำหรับอัปเดตหนังสือ
document.getElementById('updateBookBtn').addEventListener('click', async () => {
    const bookId = parseInt(document.getElementById('updateId').value);
    const updatedData = {
        title: document.getElementById('updateTitle').value,
        author: document.getElementById('updateAuthor').value,
        genre: document.getElementById('updateGenre').value,
        publishedYear: parseInt(document.getElementById('updatePublishedYear').value),
        isAvailable: document.getElementById('updateIsAvailable').checked,
    };

    const response = await fetch(`${API_URL}/books/${bookId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
    });

    const result = await response.json();
    alert(`Updated Book: ${JSON.stringify(result)}`);
});

// ฟังก์ชันสำหรับลบหนังสือ
document.getElementById('deleteBookBtn').addEventListener('click', async () => {
    const bookId = parseInt(document.getElementById('deleteId').value);
    const response = await fetch(`${API_URL}/books/${bookId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        alert(`Deleted Book with ID: ${bookId}`);
    } else {
        alert('Book not found.');
    }
});

// ฟังก์ชันสำหรับค้นหาหนังสือ
document.getElementById('searchBooksBtn').addEventListener('click', async () => {
    const searchParams = {
        title: document.getElementById('searchTitle').value,
        author: document.getElementById('searchAuthor').value,
        genre: document.getElementById('searchGenre').value,
    };

    const response = await fetch(`${API_URL}/books/search`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchParams),
    });

    const results = await response.json();
    const searchResultsDiv = document.getElementById('searchResults');
    searchResultsDiv.innerHTML = ''; // เคลียร์ข้อมูลเดิม

    // ตรวจสอบว่ามีผลลัพธ์หรือไม่
    if (results.length === 0) {
        searchResultsDiv.innerHTML = '<p>No results found.</p>';
    } else {
        results.forEach(book => {
            const bookItem = document.createElement('div');
            bookItem.className = 'book-item';
            bookItem.innerHTML = `
                
                <div class="book-title">${book.title}</div>
                <br>
                <div class="book-id">Book ID: ${book.id}</div>
                <div class="book-author">Author: ${book.author}</div>
                <div class="book-genre">Genre: ${book.genre}</div>
                <div class="book-year">Published Year: ${book.publishedYear}</div>
            `;
            searchResultsDiv.appendChild(bookItem);
        });
    }
});

// ฟังก์ชันสำหรับดึงข้อมูลหนังสือทั้งหมด
document.getElementById('listBooksBtn').addEventListener('click', async () => {
    const response = await fetch(`${API_URL}/books`);

    const books = await response.json();
    const allBooksDiv = document.getElementById('allBooks');
    allBooksDiv.innerHTML = ''; // เคลียร์ข้อมูลเดิม

    books.forEach(book => {
        const bookItem = document.createElement('div');
        bookItem.className = 'book-item';
        bookItem.innerHTML = `
           
            <div class="book-title">${book.title}</div>
            <br>
            <div class="book-id">Book ID: ${book.id}</div>
            <div class="book-author">Author: ${book.author}</div>
            <div class="book-genre">Genre: ${book.genre}</div>
            <div class="book-year">Published Year: ${book.publishedYear}</div>
        `;
        allBooksDiv.appendChild(bookItem);
    });
});

// ฟังก์ชันสำหรับการบันทึกข้อมูล
document.getElementById('saveInventoryBtn').addEventListener('click', async () => {
    const filename = document.getElementById('saveFilename').value;
    const response = await fetch(`${API_URL}/save`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filename }),
    });

    const result = await response.json();
    alert(result.message);
});

// ฟังก์ชันสำหรับโหลดข้อมูลหนังสือ
document.getElementById('loadInventoryBtn').addEventListener('click', async () => {
    const filename = document.getElementById('loadFilename').value;
    const response = await fetch(`${API_URL}/load`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filename }),
    });

    const result = await response.json();
    alert(result.message);
});
