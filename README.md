# Sceyt Call SDK

JavaScript SDK for real-time voice and video calls with WebRTC. This SDK works alongside the [SceytChat SDK](https://www.npmjs.com/package/sceyt-chat) to provide calling functionality.

## Table of Contents

* [Installation](#installation)
* [Prerequisites](#prerequisites)
* [Quick Start](#quick-start)
* [Media Flow Types](#media-flow-types)
* [Call Methods](#call-methods)
* [Error Handling](#error-handling)
* [Call Events](#call-events)
* [Client Events](#client-events)
* [Call Management](#call-management)
* [Call History (CDR)](#call-history-cdr)
* [Participant States](#participant-states)
* [Logging](#logging)
* [TypeScript Support](#typescript-support)
* [License](#license)

## Installation

```bash
npm install sceyt-call
# or
yarn add sceyt-call
```

## Prerequisites

The Sceyt Call SDK requires the [SceytChat SDK](https://www.npmjs.com/package/sceyt-chat) to be installed and connected before initializing the call client. The chat client handles authentication and signaling for calls.

```bash
npm install sceyt-chat
```

```typescript
import SceytChat from 'sceyt-chat';

const chatClient = new SceytChat('{apiUrl}', '{appId}', '{clientId}');
await chatClient.connect('{accessToken}');
```

For detailed chat client setup, see the [sceyt-chat documentation](https://www.npmjs.com/package/sceyt-chat).

## Quick Start

```typescript
import SceytCallClient, { MediaFlow } from 'sceyt-call';

// Initialize call client with connected chat client
const callClient = new SceytCallClient(chatClient);

// Listen for incoming calls
callClient.on('invitedToCall', ({ call }) => {
  console.log(`Incoming call from ${call.createdBy}`);
  call.sendRinging();
  // Show incoming call UI...
});

// Start a call — prepare first, then join
const result = callClient.prepareCall('call-123', {
  mediaFlow: MediaFlow.P2P,
  participantIds: ['user1', 'user2'],
});
const call = result.data;
call?.join({ audioSettings: { publishAudio: true } });

// Handle call events
call.on('callStateChanged', ({ state }) => {
  console.log(`Call state: ${state}`);
});

call.on('participantStateChanged', ({ participant, state }) => {
  console.log(`${participant.id} is now ${state}`);
});
```

## Media Flow Types

| Type | Description | Best For |
|------|-------------|----------|
| `MediaFlow.P2P` | Direct peer-to-peer connection | 1:1 calls |
| `MediaFlow.SFU` | Server-routed media (Selective Forwarding Unit) | Group calls |
| `MediaFlow.S2W` | SIP-to-WebRTC media processing | 1:1 calls |

## Call Methods

```typescript
// Audio controls
call.mute(true);       // Mute microphone
call.mute(false);      // Unmute
call.hold(true);       // Put on hold

// Video controls
await call.enableVideo(true);
await call.startScreenShare();
await call.stopScreenShare();

// Device selection
const cameras = await call.getAvailableVideoDevices();
await call.selectVideoDevice(cameras[0].deviceId);

const mics = await call.getAvailableAudioDevices();
await call.selectAudioDevice(mics[0].deviceId);

// Participants
await call.addParticipants(['user3', 'user4']);
await call.switchToSFU();  // Upgrade P2P to SFU
```

## Error Handling

All methods return `CallClientResult<T>` with structured error information instead of throwing exceptions:

### Pattern 1: Check Result Success

```typescript
const result = await call.enableVideo(true);
if (!result.success) {
  console.error('Error:', result.error?.message);
  console.error('Code:', result.error?.code);
}
```

### Pattern 2: Use Error Callback

Some methods support optional error callbacks for real-time error feedback:

```typescript
const handleError = (result) => {
  if (result.error) {
    console.error(result.error.message, result.error.code);
  }
};

// Synchronous methods — check return value
const prepareResult = callClient.prepareCall('call-123', { mediaFlow: MediaFlow.P2P });
if (!prepareResult.success) console.error(prepareResult.error?.message);

// Join — sync result + optional async signal error callback
const joinResult = call.join({ audioSettings: { publishAudio: true } }, handleError);
if (!joinResult.success) console.error(joinResult.error?.message);

// Create without joining — optional async signal error callback
call.create(handleError);

// Ringing notification — optional async signal error callback
call.sendRinging(handleError);

// Reject — optional async signal error callback
call.reject('busy', handleError);

// Async methods — await result + optional async signal error callback
const videoResult = await call.enableVideo(true, handleError);
await call.startScreenShare(handleError);
await call.stopScreenShare(handleError);
call.mute(true, handleError);
await call.switchToSFU(handleError);
```

**Methods Supporting Error Callbacks:**
- `callClient.prepareCall(callId, options?)` — check return value
- `call.join(options, errorCallback?)` — signal rejection delivered via callback
- `call.create(errorCallback?)` — server CREATE rejection delivered via callback
- `call.sendRinging(errorCallback?)` — signal error delivered via callback
- `call.reject(reason?, errorCallback?)` — signal error delivered via callback
- `call.enableVideo(enabled, errorCallback?)` — camera/signal errors via callback
- `call.startScreenShare(errorCallback?)` — screen share errors via callback
- `call.stopScreenShare(errorCallback?)` — signal errors via callback
- `call.mute(mute, errorCallback?)` — signal errors via callback
- `call.switchToSFU(errorCallback?)` — signal errors via callback
- `call.leave()` — no callback, check return value

**All Error Codes:**

| Code | Error Type | Cause | Solution |
|------|-----------|-------|----------|
| 4000 | `BadSignal` | Invalid signal format | Check signal parameters |
| 4001 | `CallNotFound` | Call not found in system | Verify call ID exists |
| 4002 | `ParticipantNotFound` | Participant not in call | Check participant exists |
| 4003 | `NotAllowed` | Operation not allowed in state | Verify call state |
| 4004 | `ParticipantAlreadyExists` | Participant already in call | Don't add duplicates |
| 4005 | `NotAllowed` | Permission denied by user | Enable in browser settings |
| 4006 | `BadRequest` | Invalid request parameters | Fix parameters |
| 5001 | `InternalError` | Server-side error | Retry (resendable) |
| 9901 | `NetworkError` | Network connectivity lost | Check connection (resendable) |
| 9902 | `Timeout` | Operation timed out | Retry (resendable) |
| 9903 | `NetworkError` | Network error occurred | Check connection (resendable) |
| 9904 | `NetworkError` | Network error occurred | Check connection (resendable) |

## Call Events

```typescript
call.on('audioTrackAdded', ({ participant, track }) => {
  // Play participant's audio
  const audio = new Audio();
  audio.srcObject = new MediaStream([track]);
  audio.play();
});

call.on('videoTrackAdded', ({ participant, track }) => {
  // Display participant's video
  videoElement.srcObject = new MediaStream([track]);
});

call.on('participantEvent', ({ participant, event }) => {
  // event: 'Mute' | 'Unmute' | 'Hold' | 'VideoEnabled' | etc.
});

call.on('activeSpeakersChanged', ({ activeSpeakers }) => {
  // Handle active speaker detection
});

call.on('sessionRenewed', ({ call, sessionId }) => {
  // Fired when the server assigns a new sessionId to an existing call
});
```

## Client Events

```typescript
callClient.on('invitedToCall', ({ call }) => {
  // Handle incoming call
});

callClient.on('ongoingCallsUpdated', ({ calls }) => {
  // Handle call list updates
});
```

## Call Management

```typescript
// Prepare a call (placed in prepareCalls, no media yet)
const result = callClient.prepareCall('call-123', {
  mediaFlow: MediaFlow.SFU,
  participantIds: ['user1'],
});
const call = result.data;

// Join — moves call from prepareCalls to activeCalls
call?.join({ audioSettings: { publishAudio: true } });

// Create without joining (sends invites, stays in prepareCalls until server confirms)
call?.create((error) => console.error(error.error?.message));

// Accept an incoming call
callClient.on('invitedToCall', ({ call }) => {
  call.join({ audioSettings: { publishAudio: true } });
});

// Reject / leave
call?.reject('busy');
call?.leave();

// Calls prepared but not yet joined
const pendingCalls = callClient.prepareCalls;

// Calls actively joined
const activeCalls = callClient.activeCalls;

// Active speakers on a call (updated via 'activeSpeakersChanged' event)
const speakers = call?.activeSpeakers;

// Fetch a call by ID (local first, then server)
const { data } = await callClient.getCall('call-id');
```

## Call History (CDR)

```typescript
import { CDRRequestOrder } from 'sceyt-call';

const query = new callClient.RecentCallQueryBuilder()
  .setOrder(CDRRequestOrder.DESC)
  .limit(20)
  .build();

const { records, hasNext } = await query.loadNextPage();

records.forEach(record => {
  console.log(`Call: ${record.callId}`);
  console.log(`Duration: ${record.endedAt - record.startedAt}ms`);
  console.log(`Participants: ${record.participants.length}`);
});
```

## Participant States

| State | Description |
|-------|-------------|
| `Idle` | Not actively participating |
| `Ringing` | Device is ringing |
| `Joined` | In the call |
| `Left` | Left the call |
| `Declined` | Declined invitation |
| `Kicked` | Removed by another user |
| `NoAnswer` | Did not answer |

## Logging

```typescript
callClient.onLog((entry) => {
  console.log(`[${entry.level}] ${entry.prefix}: ${entry.message}`);
});
```

## TypeScript Support

Full TypeScript support with exported types:

```typescript
import type {
  Call,
  Participant,
  IJoinCallOptions,
  CallEventMap,
  CallClientEventMap,
  ICallDetailRecord,
  ParticipantState,
  CallState,
  MediaFlow
} from 'sceyt-call';
```

## License

See the [LICENSE](https://github.com/sceyt/sceyt-call-js-sdk/blob/HEAD/LICENSE.txt) file for details.
