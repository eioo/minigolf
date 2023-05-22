import React from 'react';
import { useT } from 'talkr';
import { LobbyType } from '../../types';
import { capitalize } from '../../utils/capitalize';
import Button, { ButtonProps } from '../Button';
import Stack from '../Stack';

const BUTTON_PROPS: Partial<ButtonProps> = {
  size: 'small',
  style: {
    width: '90px',
  },
};

interface LobbyNavigationProps {
  lobbyType: LobbyType;
}

function LobbyNavigation({ lobbyType }: LobbyNavigationProps) {
  const { T } = useT();

  return (
    <Stack gap="7px">
      <Button variant="yellow" href="/" {...BUTTON_PROPS}>
        {T('LobbyControl_Main')}
      </Button>

      {['single', 'dual', 'multi'].map((btnType) => {
        if (lobbyType === btnType) {
          // Render spacer same height as the button
          return <div key={btnType} style={{ height: '21px' }} />;
        }

        return (
          <Button key={btnType} href={`/lobby/${btnType}`} {...BUTTON_PROPS}>
            {T(`LobbySelect_${capitalize(btnType)}Player`)}
          </Button>
        );
      })}

      <Button variant="red" href="/" {...BUTTON_PROPS}>
        {T('LobbySelect_Quit')}
      </Button>
    </Stack>
  );
}

export default LobbyNavigation;
