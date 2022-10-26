import React, { useCallback, VFC } from 'react';
import { Button, Input, Label } from '@pages/SignUp/styles';
import { IChannel, IUser } from '@typings/db';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';

import Modal from '@components/Modal';
import useInput from '@hooks/useInput';

import fetcher from '@utils/fetcher';
import axios from 'axios';
import useSWR from 'swr';

interface Props {
  show: boolean;
  onCloseModal: () => void;
  setShowInviteChannelModal: (flag: boolean) => void;
}

const InviteChannelModal: VFC<Props> = ({ show, onCloseModal, setShowInviteChannelModal }) => {
  const [newMemberChannel, onChangeNewMemberChannel, setNewMemberChannel] = useInput('');
  const { workspace, channel } = useParams<{ workspace: string; channel: string }>();

  const { data: userData } = useSWR<IUser | false>('/api/users', fetcher);

  const { revalidate: revalidateMembers } = useSWR<IChannel[]>(
    userData ? `/api/workspaces/${workspace}/channels/${channel}/members` : null,
    fetcher,
  );

  const onCreateChannel = useCallback(
    (e) => {
      e.preventDefault();

      if (!newMemberChannel || !newMemberChannel.trim()) return;

      axios
        .post(
          `/api/workspaces/${workspace}/channels/${channel}/members`,
          {
            email: newMemberChannel,
          },
          { withCredentials: true },
        )
        .then(() => {
          revalidateMembers();
          setShowInviteChannelModal(false);
          setNewMemberChannel('');
        })
        .catch((error) => {
          console.dir(error);
          toast.error(error.response?.data, { position: 'bottom-center' });
        });
    },
    [channel, newMemberChannel, setNewMemberChannel, setShowInviteChannelModal, revalidateMembers, workspace],
  );

  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form onSubmit={onCreateChannel}>
        <Label id="workspace-label">
          <span>채널 맴버초대</span>
          <Input id="channel" value={newMemberChannel} onChange={onChangeNewMemberChannel} />
        </Label>
        <Button type="submit">채널 초대하기</Button>
      </form>
    </Modal>
  );
};

export default InviteChannelModal;
