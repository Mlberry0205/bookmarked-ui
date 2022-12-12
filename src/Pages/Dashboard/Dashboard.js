import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Shelf from '../../Components/Shelf/Shelf'
import { useQuery, useMutation, gql } from '@apollo/client'

const Dashboard = ({ setUserId }) => {

  const GET_DASHBOARD = gql`
  query getDashboardBooks {
    user(id: 1) {
      id
      name
      userBooks {
        bookId
        status
        book {
          id
          bookTitle
          bookCover
          author
          isbn13
          available
        }
      }
    }
  }
`;

  const DELETE_BOOK = gql`
    mutation destroyBook($input: DestroyBookInput!) {
      destroyBook(input: $input) {
        id
      }
    }
  `;

  const [ destroyBook, { deleteError, deleteLoading }] = useMutation(DELETE_BOOK, {refetchQueries: [GET_DASHBOARD]} )

  function DeleteBook(id) {
    if (deleteError) return <p>Error : {error.message}</p>
    if (deleteLoading) return <p>Loading...</p>
    
    destroyBook({
      variables: {
        input: {
          id: id
        }
      }
    })
    refetch()
  }

  const TOGGLE_AVAILABLE = gql `
  mutation updateBook($input: UpdateBookInput!){
    updateBook(input: $input) {
      id, 
      attributes{
      available
    }} 
  }
  `
  const [ updateBook, { updateError, updateLoading }] = useMutation(TOGGLE_AVAILABLE)

  function UpdateBook(id, available) {
    console.log('jello')
    console.log('here', available)
    if (updateError) return <p>Error : {error.message}</p>
    if (updateLoading) return <p>Loading...</p>

   updateBook({
      variables: {
        input: {
          id: id,
          available: available
        }
      }
    })
    refetch()
  }
  //on the update book we need it to have an if statement taht says if available === true return false else if available === false return true
  
  const { loading, error, data, refetch } = useQuery(GET_DASHBOARD, {fetchPolicy:"cache-and-network"})
  
  useEffect(() => {
    if (data && data.user) {
      setUserId(data.user.id)
    }
  }, [data])
  
  if (error) return <p>Error : {error.message}</p>
  if (loading) return <p>Loading...</p>
  
  let owned = []
  let bookmarked = []
  
  if (data) {
    const books = data.user.userBooks
    books.forEach(book => {
      book.status === 'OWNED' ? owned.push(book) : bookmarked.push(book)
    })
  }

  
  return (
    <div data-cy="bookshelves-container" className="bookshelves-container">
      <Link to="/browse">
        <button data-cy="browse-button" className="button">Browse</button>
      </Link>
      <Link to="/add">
        <button data-cy="add-button" className="button">Add a Book</button>
      </Link>
      <Shelf 
        owned={true}
        ownedBooks={owned}
        myShelfBooks={true}
        deleteBook={DeleteBook}
        updateBook={UpdateBook}
      />
      <Shelf 
        bookmarkedBooks={bookmarked}
        owned={false}
      />
    </div>
  )
}

export default Dashboard
