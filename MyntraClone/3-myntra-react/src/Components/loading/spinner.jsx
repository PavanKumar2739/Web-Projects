import './spinner.css'
const Spinner = () => {
  return (
    <>
      <div class="d-flex justify-content-center spinnerContainer">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;
