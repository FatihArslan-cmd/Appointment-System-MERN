import React from 'react';
import { FaBriefcase, FaUser } from 'react-icons/fa';

export default function AccountTypeSelector({ accountType, onAccountTypeChange }) {
  return (
    <div className="account-type-selection">
      <button
        type="button"
        className={`account-button ${accountType === 'business' ? 'selected' : ''}`}
        onClick={() => onAccountTypeChange('business')}
      >
        <FaBriefcase /> Kurumsal Hesap
      </button>
      <button
        type="button"
        className={`account-button ${accountType === 'personal' ? 'selected' : ''}`}
        onClick={() => onAccountTypeChange('personal')}
      >
        <FaUser /> Bireysel Hesap
      </button>
    </div>
  );
}
