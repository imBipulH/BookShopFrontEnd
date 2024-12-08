/* eslint-disable react/prop-types */
const Table = ({ data }) => {
  return (
    <div className='table-auto w-full text-left '>
      {data.map((item, index) => (
        <table key={index} className='w-full'>
          <tr>
            <th className='border  border-white border-t border-t-sky-100 px-4 py-2 bg-sky-100'>
              Title
            </th>
            <td className='border px-4 py-2'>{item.title}</td>
          </tr>
          <tr>
            <th className='border border-white px-4 py-2 bg-sky-100'>Author</th>
            <td className='border px-4 py-2'>{item.author}</td>
          </tr>
          <tr>
            <th className='border border-white px-4 py-2 bg-sky-100'>
              Publisher
            </th>
            <td className='border px-4 py-2'>{item.publisher}</td>
          </tr>
          <tr>
            <th className='border border-white px-4 py-2 bg-sky-100'>ISBN</th>
            <td className='border px-4 py-2'>{item.isbn}</td>
          </tr>
          <tr>
            <th className='border border-white px-4 py-2 bg-sky-100'>
              Edition
            </th>
            <td className='border px-4 py-2'>{item.edition}</td>
          </tr>
          <tr>
            <th className='border border-white px-4 py-2 bg-sky-100'>
              Number of Pages
            </th>
            <td className='border px-4 py-2'>{item.numberOfPages}</td>
          </tr>
          <tr>
            <th className='border border-white px-4 py-2 bg-sky-100'>
              Country
            </th>
            <td className='border px-4 py-2'>{item.country}</td>
          </tr>
          <tr>
            <th className='border border-white px-4 py-2 bg-sky-100'>
              Language
            </th>
            <td className='border px-4 py-2'>{item.language}</td>
          </tr>
        </table>
      ))}
    </div>
  )
}

export default Table
