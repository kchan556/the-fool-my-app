/**
 * エラーコードのカテゴリ定義
 */
export const ErrorCategory = {
  CONNECTION: 'CONN',
  GAME: 'GAME',
  ROOM: 'ROOM',
  VALIDATION: 'VALID',
  SYSTEM: 'SYS'
} as const;

export type ErrorCategory = typeof ErrorCategory[keyof typeof ErrorCategory];

/**
 * 両リポジトリで共有されるエラーコード定数
 * the-foolバックエンドとthe-magicianフロントエンドで使用
 */
export const ErrorCode = {
  // 接続エラー (CONN_xxx)
  CONN_DISCONNECTED: 'CONN_001',
  CONN_TIMEOUT: 'CONN_002',
  CONN_INVALID_MESSAGE: 'CONN_003',

  // ルームエラー (ROOM_xxx)
  ROOM_NOT_FOUND: 'ROOM_001',
  ROOM_FULL: 'ROOM_002',
  ROOM_CLOSED: 'ROOM_003',

  // マッチングエラー (MATCHING_xxx)
  MATCHING_ALREADY_QUEUED: 'MATCHING_001',
  MATCHING_QUEUE_NOT_FOUND: 'MATCHING_002',
  MATCHING_TIMEOUT: 'MATCHING_003',
  MATCHING_CANCELLED: 'MATCHING_004',
  MATCHING_INVALID_CRITERIA: 'MATCHING_005',
  MATCHING_INVALID_DECK: 'MATCHING_006',
  MATCHING_INSUFFICIENT_CREDITS: 'MATCHING_007',

  // ゲームエラー (GAME_xxx)
  GAME_INVALID_MOVE: 'GAME_001',
  GAME_NOT_YOUR_TURN: 'GAME_002',
  GAME_INVALID_STATE: 'GAME_003',

  // バリデーションエラー (VALID_xxx)
  VALID_INVALID_PAYLOAD: 'VALID_001',
  VALID_MISSING_FIELD: 'VALID_002',

  // システムエラー (SYS_xxx)
  SYS_INTERNAL_ERROR: 'SYS_001',
  SYS_UNKNOWN_ERROR: 'SYS_999'
} as const;

export type ErrorCode = typeof ErrorCode[keyof typeof ErrorCode];

/**
 * エラーコードに対応する日本語メッセージ
 */
export const ErrorMessage: Record<ErrorCode, string> = {
  [ErrorCode.CONN_DISCONNECTED]: '接続が切断されました',
  [ErrorCode.CONN_TIMEOUT]: '接続がタイムアウトしました',
  [ErrorCode.CONN_INVALID_MESSAGE]: '無効なメッセージを受信しました',

  [ErrorCode.ROOM_NOT_FOUND]: 'ルームが見つかりません',
  [ErrorCode.ROOM_FULL]: 'ルームが満員です',
  [ErrorCode.ROOM_CLOSED]: 'ルームが閉じられました',

  [ErrorCode.MATCHING_ALREADY_QUEUED]: '既にマッチングキューに参加しています',
  [ErrorCode.MATCHING_QUEUE_NOT_FOUND]: 'マッチングキューが見つかりません',
  [ErrorCode.MATCHING_TIMEOUT]: 'マッチングがタイムアウトしました',
  [ErrorCode.MATCHING_CANCELLED]: 'マッチングがキャンセルされました',
  [ErrorCode.MATCHING_INVALID_CRITERIA]: 'マッチング条件が無効です',
  [ErrorCode.MATCHING_INVALID_DECK]: 'デッキがモードの条件を満たしていません',
  [ErrorCode.MATCHING_INSUFFICIENT_CREDITS]: 'プレイ可能回数が不足しています',

  [ErrorCode.GAME_INVALID_MOVE]: '無効な手です',
  [ErrorCode.GAME_NOT_YOUR_TURN]: 'あなたのターンではありません',
  [ErrorCode.GAME_INVALID_STATE]: 'ゲーム状態が無効です',

  [ErrorCode.VALID_INVALID_PAYLOAD]: '無効なデータです',
  [ErrorCode.VALID_MISSING_FIELD]: '必須項目が不足しています',

  [ErrorCode.SYS_INTERNAL_ERROR]: 'サーバーエラーが発生しました',
  [ErrorCode.SYS_UNKNOWN_ERROR]: 'エラーが発生しました'
};

/**
 * エラーコードが特定のカテゴリに属するかチェック
 */
export function isErrorCategory(code: ErrorCode, category: ErrorCategory): boolean {
  return code.startsWith(category);
}
