import { DefaultLayout } from '@/components';

const Students = (props) => {
  return (
    <DefaultLayout title={'layout'}>
      <p>HEad</p>
    </DefaultLayout>
  );
};

// Students.getInitialProps = async function (req, res, init) {
//   console.log('req : ', await req.query);
//   let title = 'testing student';
//   return {
//     title,
//   };
// };

export default Students;
