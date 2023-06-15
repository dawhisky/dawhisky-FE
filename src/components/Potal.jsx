import { createPortal } from 'react-dom';

const Potal = ({ children }) => {
  const modalRoot = document.getElementById('modal');
  return createPortal(children, modalRoot);
};

export default Potal;
