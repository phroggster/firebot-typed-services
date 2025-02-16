/**
 * @license GPL-3.0-or-later
 * 
 * phroggie's unofficial type definitions for a variety of Firebot application services.
 * Copyright (C) 2025 phroggie <phroggster@users.noreply.github.com>
 * 
 * This program is free software: you can redistribute it and/or modify it under the terms
 * of the GNU General Public License as published by the Free Software Foundation, either
 * version 3 of the License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License along with this program.
 * If not, see <https://www.gnu.org/licenses/>.
 */

/** The AccountAccess service, accessible via an auto-injected `accountAccess` parameter.
 * Defined in `Firebot/src/gui/app/services/account-access.service.js`
 */
export interface AccountAccess {
    /** Information about the accounts that are available to Firebot. */
    readonly accounts: Readonly<{
        /** Information about the streamer's Twitch account. */
        streamer: {
            /** The Twitch username of the streamer's account. */
            username: string;
            /** Whether or not the streamer's account is logged in. */
            loggedIn: boolean;
            /** The type of account that the streamer is using. */
            broadcasterType?: "partner" | "affiliate" | "";
        };
        /** Information about the bot's Twitch account. */
        bot: {
            /** The Twitch username of the bot's account. */
            username: string;
            /** Whether or not the bot's account is logged in. */
            loggedIn: boolean;
        };
    }>;
    
    /** Refreshes the information available in the `accounts` property. */
    getAccounts(): void;
    /** Logs the specified account out. */
    logoutAccount(accountType: "streamer" | "bot"): void;
}

/** The ActivityFeedService, accessible via an auto-injected `activityFeedService` parameter.
 * Defined in `Firebot/src/gui/app/services/activity-feed.service.js`
 */
export interface ActivityFeedService {
    /** Gets a boolean value indicating whether all activity feed items have been acknowledged.
     * @returns `true` if everything has been acknowledged; `false` otherwise.
     */
    allAcknowledged(): boolean;
    /** Marks all activity feed items as acknowledged.
     * Also available via `frontendCommunicator.fireEventAsync("acknowledge-all-activity");`
     */
    markAllAcknowledged(): void;
    /** Marks all activity feed items as not acknowledged. */
    markAllNotAcknowledged(): void;
    /** Re-triggers an activity feed event by the event's unique ID, and displays a toast that it was re-triggered.
     * @param activityId The unique ID of the activity feed event.
     */
    retriggerEvent(activityId: string): void;
    /** Shows a modal allowing the user to filter their activity feed alerts by event type. */
    showEditActivityFeedEventsModal(): void;
    /** If all activity feed items are acknowledged, marks than as not acknowledged; otherwise, marks them all as acknowledged. */
    toggleMarkAllAcknowledged(): void;
    /** Gets the number of not acknowledged activity feed items. */
    unacknowledgedCount(): number;
}

/** The AdBreakService, accessible via an auto-injected `adBreakService` parameter.
 * Defined in `Firebot/src/gui/app/services/ad-break.service.js`
 */
export interface AdBreakService {
    /** How many seconds the current ad break will last for. */
    readonly adDuration: number;
    /** Whether or not an ad break is currently active.
     * @returns `true` if an ad break is currently ongoing; `false` otherwise.
     */
    readonly adRunning: boolean;
    /** The timestamp of when the current ad break will conclude at. */
    readonly endsAt: string;
    /** The human-readable duration of how long the current or upcoming ad break will last for, e.g. "30s", "1m", "1m30s". */
    readonly friendlyDuration: string;
    /** The timestamp of when the next ad break will occur at. */
    readonly nextAdBreak: string;
    /** Whether the ad break timer is displaying in the application header. */
    readonly showAdBreakTimer: boolean;

    /** Updates the `friendlyDuration` property for the duration of the current or upcoming ad break. */
    updateDuration(): void;
}

/** The BackendCommunicator, accessible via an auto-injected `backendCommunicator` parameter.
 * Defined in `Firebot/src/gui/app/services/backend-communicator.service.js`
 */
export interface BackendCommunicator {
    /** Emits an event of the given name asynchronously and can `await` a response.
     * @param eventName The name of the event to emit.
     * @param data The event data object to pass along.
     * @returns A `Promise` that should resolve to the result of the event.
     * @see BackendCommunicator.fireEventSync
     */
    fireEventAsync<TData = unknown, TResult = unknown>(eventName: string, data: TData): Promise<TResult>;
    /** Emits an event of the given name synchronously and blocks for a response.
     * @param eventName The name of the event to emit.
     * @param data The event data object to pass along.
     * @returns The result from the event.
     * @see BackendCommunicator.fireEventAsync
     */
    fireEventSync<TData = unknown, TResult = unknown>(eventName: string, data?: TData): TResult;
    /** Emits an event of the given name that does not provide a response. Alias of `send`.
     * @param eventName The name of the event to emit.
     * @param data The event data object to pass along.
     * @see BackendCommunicator.send
     */
    fireEvent<TData = unknown>(eventName: string, data?: TData): void;
    /** Subscribes to the given event with a synchronous callback.
     * @param eventName The name of the event to listen for.
     * @param callback The synchronous callback to invoke when the event is fired.
     * @returns A unique identifier of the attached synchronous listener. Can't really be used for anything.
     * @see BackendCommunicator.onAsync
     */
    on<T = unknown>(eventName: string, callback: (data: T) => void): string;
    /** Subscribes to the given event with an asynchronous callback.
     * @param eventName The name of the event to listen for.
     * @param callback The asynchronous callback to invoke when the event is fired.
     * @returns A unique identifier of the attached asynchronous listener. Can't really be used for anything.
     * @see BackendCommunicator.on
     */
    onAsync<T = unknown>(eventName: string, callback: (data: T) => Promise<void>): string;
    /** Emits an event of the given name that does not provide a response. Alias of `fireEvent`.
     * @param eventName The name of the event to emit.
     * @param data The event data object to pass along.
     * @see BackendCommunicator.fireEvent
     */
    send<TData = unknown>(eventName: string, data?: TData): void;
}

/** The BackupService, accessible via an auto-injected `backupService` parameter.
 * Defined in `Firebot/src/gui/app/services/backup.service.js`
 */
export interface BackupService {
    /** The path to the Firebot backups folder on-disk. */
    readonly backupFolderPath: string;

    /** Displays a modal to allow migrating the Firebot backups folder to a new location. */
    initiateBackupFolderMove(): void;
    /** Restores a Firebot backup from the given file path, displaying a modal of the status. Forcibly restarts Firebot
     * after a successful restoration.
     */
    initiateBackupRestore(backupFilePath: string): void;
    /** Migrates the Firebot backup folder path to the new folder.
     * @param newPath The new folder location as to where the backups should be retained.
     * @returns `true` if the migration succeeded; `false` otherwise.
     */
    moveBackupFolder(newPath: string): Promise<boolean>;
    /** Opens the Firebot backups folder in the a file browser, e.g. Dolphin, Explorer, Finder, Nautilus, Nemo, or Thunar. */
    openBackupFolder(): void;
    /** Opens a file chooser to select a Firebot backup .zip file. */
    openBackupZipFilePicker(): Promise<string | null>;
    /** Restores Firebot from the given backup file. If successful, you *really* should restart Firebot.
     * @param backupFilePath The path to the .zip file to restore from.
     * @returns A Promise of information about whether the restoration succeeded, or why it failed.
     */
    restoreBackup(backupFilePath: string): Promise<
        {
            /** Whether or not the restoration succeeded. */
            success: true;
        } |
        {
            /** Whether or not the restoration succeeded. */
            success: false;
            /** The human-readable reason why the restoration failed. */
            reason: string;
        }
    >;
    /** Displays a modal that displays the available backups, and allows for protection, deleting, or restoring from one. */
    showBackupListModal(): void;
    /** Initializes a backup of all Firebot settings and data. */
    startBackup(): void;
}

/** The ChannelRewardsService, accessible via an auto-injected `channelRewardsService` parameter.
 * Defined in `Firebot/src/gui/app/services/channel-rewards.service.js`
*/
export interface ChannelRewardsService {
    /** The currently-loaded channel point rewards. These may not necessarily correlate with the rewards listed on Twitch. */
    readonly channelRewards: ReadonlyArray<unknown>;

    /** Deletes the channel point reward with the given id, and removes the reward from Twitch.
     * @param channelRewardId The unique identifier of the channel point reward to delete.
    */
    deleteChannelReward(channelRewardId: string): void;
    /** Loads the service's view of channel rewards. */
    loadChannelRewards(): void;
    /** Saves a channel reward.
     * @param channelReward The channel reward data to persist. Not quite a SavedChannelReward, but almost.
     * @returns `true` if the channel reward was successfully saved; `false` otherwise.
     */
    saveChannelReward(channelReward: unknown): Promise<boolean>;
    /** Stores all of the provided array of channel point rewards, optionally pushing the changes up to Twitch.
     * @param channelRewards An array of SavedChannelReward objects.
     * @param updateTwitch (default `false`) Whether to push the new rewards set up to Twitch.
     */
    saveAllRewards(channelRewards: unknown[], updateTwitch?: boolean): void;
    /** Displays an add or edit channel point reward modal.
     * @param reward (optional; `undefined` to add a new one) A SavedChannelReward to edit.
     */
    showAddOrEditRewardModal(reward?: unknown): void;
}

interface ToastData {
    /** The HTML or raw text to display on the toast. */
    content: string;

    /** (Optional; default "") Additional classnames to append to the toast. */
    additionalClasses?: string;
    /** (Optional; default "") Built-in animation type for toast messages. */
    animation?: "slide" | "fade" | "";
    /** (Optional; default: "success") An ngToast/Bootstrap-css class name to use for the toast. */
    className?: "danger" | "info" | "success" | "warning";
    /** (Optional; default false) Whether to add a close button to the toast. */
    dismissButton?: boolean;
    /** (Optional; default "&times;") HTML of the close button to append. */
    dismissButtonHtml?: string;
    /** (Optional; default true) Allows toast messages to be removed on mouse click. */
    dismissOnClick?: boolean;
    /** (Optional; default "right") Horizontal position of the toast message. */
    horizontalPosition?: "center" | "left" | "right";
    /** (Optional; default 4000) How long the toast should cook for, in milliseconds. */
    timeout?: number;
    /** (Optional; default "top") Vertical position of the toast message. */
    verticalPosition?: "bottom" | "top";

    /** (Optional) A callback that will be triggered whenever the toast message is dismissed. */
    onDismiss?: (toastData: Omit<ToastData, "onDismiss">) => void;
}
/** The NgToast service, accessible via an auto-injected `ngToast` parameter.
 * Defined in the external module `ng-toast`, injected by `src/gui/app/app-main.js`.
 */
export interface NgToast {
    /** Creates some toast. Also available via `frontendCommunicator.send("showToast", toastData);`
     * @param toastData The message content (when string) or the ToastData to be displayed.
    */
    create(toastData: string | ToastData): void;
}

/** The Utility service, accessible via an auto-injected `utilityService` parameter.
 * Defined in `Firebot/gui/app/services/utility.service.js`
 */
export interface Utility {
    /** Displays a modal UI element. */
    showModal<T extends Record<string, unknown> = Record<string, unknown>>(showModalContext:
        ({
            component: string;
        } | {
            templateUrl: string;
            controllerFunc: Function;
        }) &
        {
            autoSlide?: boolean;
            backdrop?: boolean | "static";
            breadcrumbName: string;
            keyboard?: boolean;
            resolveObj?: {
                [K in keyof T]: () => T[K];
            };
            size?: "sm" | "md" | "lg";
            windowClass?: string;

            closeCallback?: (result: T & { action: string; }) => void;
            dismissCallback?: () => void;
        }
    ): void;
}
