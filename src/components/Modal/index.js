import React, { useState } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';

import { ModalTool } from './styles';

export default function Modal({ children, closeable }) {
  const [visible, setVisible] = useState(true);

  return (
    visible && (
      <ModalTool>
        <div>
          {children}
          {closeable && (
            <>
              <IoIosCloseCircle
                onClick={() => {
                  setVisible(false);
                }}
                fill="#dc3545"
                size={60}
              />
              <div className="bac" />
            </>
          )}
        </div>
      </ModalTool>
    )
  );
}
