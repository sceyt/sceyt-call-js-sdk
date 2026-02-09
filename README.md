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

// Start a call
const call = callClient.join({
  id: 'call-123',
  participantIds: ['user1', 'user2'],
  mediaFlow: MediaFlow.P2P
});

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
    console.error(result.error.message);
  }
};

// Methods with error callback support:
const joinResult = callClient.join(options, handleError);        // error callback
callClient.reject(call, reason, handleError);                    // error callback
const videoResult = await call.enableVideo(true, handleError);   // error callback
await call.startScreenShare(handleError);                        // error callback
await call.stopScreenShare(handleError);                         // error callback
call.mute(true, handleError);                                    // error callback
await call.switchToSFU(handleError);                             // error callback
```

**Methods Supporting Error Callbacks:**
- `callClient.join(options, errorCallback?)` - Called on join errors
- `callClient.reject(call, reason?, errorCallback?)` - Called on reject errors
- `callClient.leave(call)` - No callback (check result instead)
- `call.enableVideo(enabled, errorCallback?)` - Called on video/camera errors
- `call.startScreenShare(errorCallback?)` - Called on screen share errors
- `call.stopScreenShare(errorCallback?)` - Called on stop errors
- `call.mute(mute, errorCallback?)` - Called on mute errors
- `call.switchToSFU(errorCallback?)` - Called on SFU switch errors

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
// Accept incoming call
const call = callClient.join({
  id: incomingCall.id,
  sessionId: incomingCall.sessionId,
  participantIds: [],
  mediaFlow: incomingCall.mediaFlow
});

// Reject call
callClient.reject(call, 'busy');

// Leave call
callClient.leave(call);

// Get active calls
const activeCalls = callClient.activeCalls;
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

See the [LICENSE](LICENSE.txt) file for details.
