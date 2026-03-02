import type {
  ChoicesPayload,
  DebugPrintPayload,
  DisplayEffectPayload,
  MatchingStatusPayload,
  MulliganStartPayload,
  OperationPayload,
  PlayerDisconnectedPayload,
  PlayerReconnectedPayload,
  SelectedPayload,
  SoundEffectPayload,
  SyncPayload,
  TurnEndPayload,
  VisualEffectPayload,
  TurnChangePayload,
  SituationCompletedPayload,
} from './client';
import type {
  AttackPayload,
  BootPayload,
  ChoosePayload,
  ContinuePayload,
  DebugDrawPayload,
  DebugDrivePayload,
  DebugMakePayload,
  DiscardPayload,
  EvolveDrivePayload,
  JokerDrivePayload,
  MulliganPayload,
  OverridePayload,
  SurrenderPayload,
  TriggerSetPayload,
  UnitDrivePayload,
  WithdrawalPayload,
  BlockPayload,
} from './core';
import type { PlayerEntryPayload } from './room';
import type {
  RoomOpenRequestPayload,
  RoomOpenResponsePayload,
  MatchingStartRequestPayload,
  MatchingCancelRequestPayload,
  LeaveRoomRequestPayload,
  MatchingStatusRequestPayload,
} from './server';

export type * from './base';
export type * from './room';
export type * from './server';
export type * from './client';
export type * from './core';

export type Payload =
  | RoomOpenRequestPayload
  | RoomOpenResponsePayload
  | MatchingStartRequestPayload
  | MatchingCancelRequestPayload
  | PlayerEntryPayload
  | PlayerDisconnectedPayload
  | PlayerReconnectedPayload
  | SyncPayload
  | DebugDrawPayload
  | DebugDrivePayload
  | DebugMakePayload
  | OverridePayload
  | UnitDrivePayload
  | DisplayEffectPayload
  | ContinuePayload
  | DebugPrintPayload
  | WithdrawalPayload
  | ChoosePayload
  | ChoicesPayload
  | TriggerSetPayload
  | VisualEffectPayload
  | SoundEffectPayload
  | OperationPayload
  | TurnEndPayload
  | AttackPayload
  | BlockPayload
  | BootPayload
  | DiscardPayload
  | SelectedPayload
  | EvolveDrivePayload
  | JokerDrivePayload
  | MulliganPayload
  | MulliganStartPayload
  | SurrenderPayload
  | TurnChangePayload
  | MatchingStartRequestPayload
  | MatchingCancelRequestPayload
  | SituationCompletedPayload
  | LeaveRoomRequestPayload
  | MatchingStatusPayload
  | MatchingStatusRequestPayload
