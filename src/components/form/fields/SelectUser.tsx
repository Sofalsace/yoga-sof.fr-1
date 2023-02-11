import React from 'react';
import { AutocompleteElement } from 'react-hook-form-mui';
import { trpc } from '../../../common/trpc';
import { User } from '@prisma/client';
import { displayUserName } from '../../../common/display';

interface SelectUserProps {
  name: string;
  multiple?: boolean;
  label?: string;
}

export const SelectUser: React.FC<SelectUserProps> = ({ name, multiple, label }) => {
  const { data, isLoading } = trpc.user.findAll.useQuery({ disabled: false });
  return (
    <AutocompleteElement
      name={name}
      options={data ?? []}
      multiple={multiple}
      matchId
      label={label ?? `Utilisateur${multiple ? 's' : ''}`}
      loading={isLoading}
      autocompleteProps={{
        disabled: isLoading,
        getOptionLabel: (option: User | undefined) => option ? displayUserName(option) : '...',
      }}
    />
  );
};
