import { useStore } from '@nanostores/react';
import { ClientOnly } from 'remix-utils/client-only';
import { chatStore } from '~/lib/stores/chat';
import { classNames } from '~/utils/classNames';
import { HeaderActionButtons } from './HeaderActionButtons.client';
import { ChatDescription } from '~/lib/persistence/ChatDescription.client';
import { selectDirectory, selectedDirectoryHandle } from '~/lib/persistence/fileSystem';
import { ProviderSelector } from '~/components/ui/ProviderSelector.client';

export function Header() {
  const chat = useStore(chatStore);
  const directoryHandle = useStore(selectedDirectoryHandle);

  return (
    <header
      className={classNames(
        'flex items-center bg-bolt-elements-background-depth-1 p-5 border-b h-[var(--header-height)]',
        {
          'border-transparent': !chat.started,
          'border-bolt-elements-borderColor': chat.started,
        },
      )}
    >
      <div className="flex items-center gap-2 z-logo text-bolt-elements-textPrimary cursor-pointer">
        <div className="i-ph:sidebar-simple-duotone text-xl" />
        <a href="/" className="text-2xl font-semibold text-accent flex items-center">
          <span className="font-bold text-xl tracking-tight">X Builder</span>
        </a>
      </div>
      <span className="flex-1 px-4 truncate text-center text-bolt-elements-textPrimary">
        <ClientOnly>{() => <ChatDescription />}</ClientOnly>
      </span>
      <div className="flex items-center gap-3">
        {/* Provider selector — always visible */}
        <ClientOnly>{() => <ProviderSelector />}</ClientOnly>

        {chat.started && (
          <ClientOnly>
            {() => (
              <div className="flex items-center gap-2">
                <button
                  onClick={selectDirectory}
                  className="px-3 py-1 bg-bolt-elements-button-primary-background text-bolt-elements-button-primary-text
                    rounded-md hover:bg-bolt-elements-button-primary-backgroundHover text-sm"
                >
                  {directoryHandle ? 'Change Folder' : 'Select Folder'}
                </button>
                {directoryHandle && (
                  <span className="text-bolt-elements-textSecondary text-sm">
                    {directoryHandle.name}
                  </span>
                )}
                <HeaderActionButtons />
              </div>
            )}
          </ClientOnly>
        )}
      </div>
    </header>
  );
}
