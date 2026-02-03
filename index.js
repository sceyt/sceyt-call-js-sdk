!(function (e, t) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
      ? define([], t)
      : "object" == typeof exports
        ? (exports["sceyt-call"] = t())
        : (e["sceyt-call"] = t());
})(this, () =>
  (() => {
    "use strict";
    var e = {
        547: (e, t, i) => {
          (Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.CallStateMachine = void 0));
          const n = i(578),
            a = (0, i(645).createLogger)("CallStateMachine");
          class l {
            constructor(e) {
              this.callId = e;
            }
            isValidStateTransition(e, t) {
              var i, n;
              return (
                null !==
                  (n =
                    null === (i = l.validStateTransitions.get(t)) ||
                    void 0 === i
                      ? void 0
                      : i.has(e)) &&
                void 0 !== n &&
                n
              );
            }
            setState(e, t, i) {
              return this.isValidStateTransition(e, t)
                ? (a.info(
                    `[25] [CallId: ${this.callId}] Call state transition for ${i}: ${t} -> ${e}`,
                    { color: "cyan" },
                  ),
                  !0)
                : (a.warn(
                    `[28] [CallId: ${this.callId}] Invalid CallState transition for ${i}: ${t} -> ${e}`,
                    { color: "red" },
                  ),
                  !1);
            }
            updateState(e, t, i) {
              return this.setState(e, t, i);
            }
          }
          ((t.CallStateMachine = l),
            (l.validStateTransitions = new Map([
              [
                n.CallState.Idle,
                new Set([n.CallState.Connecting, n.CallState.Closed]),
              ],
              [
                n.CallState.Connecting,
                new Set([
                  n.CallState.Connected,
                  n.CallState.Closed,
                  n.CallState.Idle,
                ]),
              ],
              [
                n.CallState.Connected,
                new Set([n.CallState.Closed, n.CallState.Idle]),
              ],
              [n.CallState.Closed, new Set([])],
            ])));
        },
        758: (e, t, i) => {
          (Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.ParticipantStateMachine = void 0));
          const n = i(578),
            a = (0, i(645).createLogger)("ParticipantStateMachine");
          class l {
            constructor(e, t) {
              ((this.userId = e), (this.callId = t));
            }
            isValidParticipantStateTransition(e, t) {
              var i, n;
              return (
                null !==
                  (n =
                    null === (i = l.validParticipantStateTransitions.get(t)) ||
                    void 0 === i
                      ? void 0
                      : i.has(e)) &&
                void 0 !== n &&
                n
              );
            }
            isValidConnectionTransition(e, t) {
              var i, n;
              return (
                null !==
                  (n =
                    null === (i = l.validConnectionTransitions.get(t)) ||
                    void 0 === i
                      ? void 0
                      : i.has(e)) &&
                void 0 !== n &&
                n
              );
            }
            setState(e, t, i, l) {
              let r = !1;
              (void 0 !== e &&
              void 0 !== i &&
              this.isValidParticipantStateTransition(e, i)
                ? (a.debug(
                    `[43] [CallId: ${this.callId}] Participant state transition: ${i} -> ${e}`,
                  ),
                  (r = !0))
                : e &&
                  a.warn(
                    `[46] [CallId: ${this.callId}] Invalid ParticipantState transition from ${i ? n.ParticipantState[i] : "undefined"} to ${e ? n.ParticipantState[e] : "undefined"}`,
                    { color: "yellow" },
                  ),
                void 0 !== t &&
                void 0 !== l &&
                this.isValidConnectionTransition(t, l)
                  ? (a.debug(
                      `[50] [CallId: ${this.callId}] Connection state transition: ${l} -> ${t}`,
                    ),
                    (r = !0))
                  : t &&
                    a.warn(
                      `[53] [CallId: ${this.callId}] Invalid ConnectionState transition from ${l ? n.ParticipantConnectionState[l] : "undefined"} to ${t ? n.ParticipantConnectionState[t] : "undefined"}`,
                      { color: "yellow" },
                    ));
            }
            updateState(e, t) {
              return this.isValidParticipantStateTransition(e, t)
                ? (this.setState(e, void 0, t, void 0), !0)
                : (a.warn(
                    `[63] [CallId: ${this.callId}] Invalid ParticipantState transition from ${n.ParticipantState[t]} to ${n.ParticipantState[e]}`,
                    { color: "yellow" },
                  ),
                  !1);
            }
            updateConnectionState(e, t) {
              return this.isValidConnectionTransition(e, t)
                ? (this.setState(void 0, e, void 0, t), !0)
                : (a.warn(
                    `[71] [CallId: ${this.callId}] Invalid ConnectionState transition from ${n.ParticipantConnectionState[t]} to ${n.ParticipantConnectionState[e]}`,
                    { color: "yellow" },
                  ),
                  !1);
            }
          }
          ((t.ParticipantStateMachine = l),
            (l.validParticipantStateTransitions = new Map([
              [
                n.ParticipantState.Idle,
                new Set([
                  n.ParticipantState.Ringing,
                  n.ParticipantState.Declined,
                  n.ParticipantState.Kicked,
                  n.ParticipantState.NoAnswer,
                  n.ParticipantState.Joined,
                  n.ParticipantState.Left,
                ]),
              ],
              [
                n.ParticipantState.Ringing,
                new Set([
                  n.ParticipantState.Joined,
                  n.ParticipantState.Declined,
                  n.ParticipantState.Kicked,
                  n.ParticipantState.NoAnswer,
                  n.ParticipantState.Idle,
                ]),
              ],
              [
                n.ParticipantState.Joined,
                new Set([
                  n.ParticipantState.Left,
                  n.ParticipantState.Kicked,
                  n.ParticipantState.Idle,
                ]),
              ],
              [
                n.ParticipantState.Left,
                new Set([n.ParticipantState.Idle, n.ParticipantState.Joined]),
              ],
              [
                n.ParticipantState.Declined,
                new Set([n.ParticipantState.Idle, n.ParticipantState.Joined]),
              ],
              [n.ParticipantState.Kicked, new Set([n.ParticipantState.Idle])],
              [
                n.ParticipantState.NoAnswer,
                new Set([n.ParticipantState.Idle, n.ParticipantState.Joined]),
              ],
            ])),
            (l.validConnectionTransitions = new Map([
              [
                n.ParticipantConnectionState.Idle,
                new Set([n.ParticipantConnectionState.Connecting]),
              ],
              [
                n.ParticipantConnectionState.Connecting,
                new Set([
                  n.ParticipantConnectionState.Connected,
                  n.ParticipantConnectionState.Disconnected,
                  n.ParticipantConnectionState.Idle,
                ]),
              ],
              [
                n.ParticipantConnectionState.Connected,
                new Set([
                  n.ParticipantConnectionState.Reconnecting,
                  n.ParticipantConnectionState.Disconnected,
                  n.ParticipantConnectionState.Idle,
                ]),
              ],
              [
                n.ParticipantConnectionState.Reconnecting,
                new Set([
                  n.ParticipantConnectionState.Connected,
                  n.ParticipantConnectionState.Connecting,
                  n.ParticipantConnectionState.Disconnected,
                  n.ParticipantConnectionState.Idle,
                ]),
              ],
              [
                n.ParticipantConnectionState.Disconnected,
                new Set([
                  n.ParticipantConnectionState.Idle,
                  n.ParticipantConnectionState.Reconnecting,
                  n.ParticipantConnectionState.Connected,
                ]),
              ],
            ])));
        },
        258: function (e, t, i) {
          var n =
            (this && this.__awaiter) ||
            function (e, t, i, n) {
              return new (i || (i = Promise))(function (a, l) {
                function r(e) {
                  try {
                    o(n.next(e));
                  } catch (e) {
                    l(e);
                  }
                }
                function s(e) {
                  try {
                    o(n.throw(e));
                  } catch (e) {
                    l(e);
                  }
                }
                function o(e) {
                  var t;
                  e.done
                    ? a(e.value)
                    : ((t = e.value),
                      t instanceof i
                        ? t
                        : new i(function (e) {
                            e(t);
                          })).then(r, s);
                }
                o((n = n.apply(e, t || [])).next());
              });
            };
          (Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.ActiveSpeakerManager = void 0));
          const a = i(645),
            l = i(578),
            r = (0, a.createLogger)("ActiveSpeakerManager");
          class s {
            constructor(e) {
              ((this.speakingStates = new Map()),
                (this.activeSpeakers = []),
                (this.dominantSpeaker = null),
                (this.lastActiveSpeakers = []),
                (this.lastDominantSpeaker = null),
                (this.dominantSpeakerLastChangeTime = 0),
                (this.processingInterval = null),
                (this.call = null),
                (this.internalCallHandler = null),
                (this.call = e));
            }
            start(e) {
              var t, i;
              this.processingInterval ||
                ((this.internalCallHandler = e),
                this.internalCallHandler && this.call
                  ? ((this.processingInterval = setInterval(
                      () =>
                        n(this, void 0, void 0, function* () {
                          var e, t, i, n, a;
                          try {
                            if (this.call && this.internalCallHandler) {
                              if (this.call.localParticipant) {
                                let i = 0;
                                if (this.call.mediaFlow !== l.MediaFlow.SFU) {
                                  const t = this.call.participants.find((e) => {
                                    var t, i, n, a;
                                    return (
                                      e.id !==
                                        (null ===
                                          (i =
                                            null === (t = this.call) ||
                                            void 0 === t
                                              ? void 0
                                              : t.localParticipant) ||
                                        void 0 === i
                                          ? void 0
                                          : i.id) ||
                                      e.clientId !==
                                        (null ===
                                          (a =
                                            null === (n = this.call) ||
                                            void 0 === n
                                              ? void 0
                                              : n.localParticipant) ||
                                        void 0 === a
                                          ? void 0
                                          : a.clientId)
                                    );
                                  });
                                  if (t) {
                                    const n =
                                      null ===
                                        (e =
                                          this.internalCallHandler
                                            .callParticipantsRTCMap[
                                            this.call.id
                                          ]) || void 0 === e
                                        ? void 0
                                        : e[t.getFullId()];
                                    if (n) {
                                      const e = yield n.getConnectionStats(),
                                        t = Array.from(e.values())
                                          .filter(
                                            (e) =>
                                              this.isOutboundAudio(e) ||
                                              this.isMediaSourceAudio(e),
                                          )
                                          .map((e) =>
                                            this.getStatsAudioLevel(e),
                                          )
                                          .filter((e) => null !== e);
                                      i = t.length > 0 ? Math.max(...t) : 0;
                                    }
                                  }
                                } else {
                                  const e = this.call.serverParticipant;
                                  if (e) {
                                    const n =
                                      null ===
                                        (t =
                                          this.internalCallHandler
                                            .callParticipantsRTCMap[
                                            this.call.id
                                          ]) || void 0 === t
                                        ? void 0
                                        : t[e.getFullId()];
                                    if (n) {
                                      const e = yield n.getConnectionStats(),
                                        t = Array.from(e.values())
                                          .filter(
                                            (e) =>
                                              this.isOutboundAudio(e) ||
                                              this.isMediaSourceAudio(e),
                                          )
                                          .map((e) =>
                                            this.getStatsAudioLevel(e),
                                          )
                                          .filter((e) => null !== e);
                                      i = t.length > 0 ? Math.max(...t) : 0;
                                    }
                                  }
                                }
                                (this.call.localParticipant.muted && (i = 0),
                                  this.processAudioLevels(
                                    this.call.localParticipant,
                                    i,
                                  ));
                              }
                              for (const e of this.call.participants) {
                                if (
                                  e.id === this.call.localParticipant.id &&
                                  e.clientId ===
                                    this.call.localParticipant.clientId
                                )
                                  continue;
                                let t = 0;
                                if (this.call.mediaFlow !== l.MediaFlow.SFU) {
                                  const n =
                                    null ===
                                      (i =
                                        this.internalCallHandler
                                          .callParticipantsRTCMap[
                                          this.call.id
                                        ]) || void 0 === i
                                      ? void 0
                                      : i[e.getFullId()];
                                  if (n) {
                                    const e = yield n.getConnectionStats(),
                                      i = Array.from(e.values())
                                        .filter((e) => this.isInboundAudio(e))
                                        .map((e) => this.getStatsAudioLevel(e))
                                        .filter((e) => null !== e);
                                    t = i.length > 0 ? Math.max(...i) : 0;
                                  }
                                } else {
                                  const i =
                                    null ===
                                      (n =
                                        this.internalCallHandler
                                          .callParticipantsRTCMap[
                                          this.call.id
                                        ]) || void 0 === n
                                      ? void 0
                                      : n[e.getFullId()];
                                  if (i) {
                                    const e = yield i.getConnectionStats(),
                                      n = Array.from(e.values())
                                        .filter((e) => this.isInboundAudio(e))
                                        .map((e) => this.getStatsAudioLevel(e))
                                        .filter((e) => null !== e);
                                    t = n.length > 0 ? Math.max(...n) : 0;
                                  }
                                }
                                (e.muted && (t = 0),
                                  this.processAudioLevels(e, t));
                              }
                            }
                            (this.processActiveSpeakers(),
                              this.call &&
                                (this.call.emitActiveSpeakersChanged(
                                  this.activeSpeakers,
                                ),
                                this.call.emitDominantSpeakerChanged(
                                  this.dominantSpeaker,
                                )));
                          } catch (e) {
                            r.error(
                              `[137] [CallId: ${null === (a = this.call) || void 0 === a ? void 0 : a.id}] Error processing audio levels: ${e instanceof Error ? e.message : JSON.stringify(e)}`,
                              { color: "red" },
                            );
                          }
                        }),
                      s.POLLING_INTERVAL_MS,
                    )),
                    r.info(
                      `[141] [CallId: ${null === (i = this.call) || void 0 === i ? void 0 : i.id}] Active speaker detection started`,
                    ))
                  : r.error(
                      `[47] [CallId: ${null === (t = this.call) || void 0 === t ? void 0 : t.id}] Call or InternalCallHandler is not set`,
                      { color: "red" },
                    ));
            }
            stop() {
              var e;
              (this.processingInterval &&
                (clearInterval(this.processingInterval),
                (this.processingInterval = null)),
                (this.activeSpeakers = []),
                (this.dominantSpeaker = null),
                this.speakingStates.clear(),
                (this.lastActiveSpeakers = []),
                (this.lastDominantSpeaker = null),
                r.info(
                  `[154] [CallId: ${null === (e = this.call) || void 0 === e ? void 0 : e.id}] Active speaker detection stopped`,
                ));
            }
            addParticipant(e) {
              var t;
              const i = this.getParticipantKey(e);
              this.speakingStates.has(i) ||
                (this.speakingStates.set(i, {
                  participant: e,
                  audioLevel: 0,
                  smoothedAudioLevel: 0,
                  isSpeaking: !1,
                  speakingStartTime: 0,
                }),
                r.info(
                  `[167] [CallId: ${null === (t = this.call) || void 0 === t ? void 0 : t.id}] Added participant for active speaker detection: ${e.getFullId()}`,
                ));
            }
            updateParticipant(e) {
              const t = this.getParticipantKey(e),
                i = this.speakingStates.get(t);
              i &&
                this.speakingStates.set(
                  t,
                  Object.assign(Object.assign({}, i), { participant: e }),
                );
            }
            removeParticipant(e) {
              var t, i, n;
              const a = this.getParticipantKey(e);
              (this.speakingStates.delete(a),
                this.lastActiveSpeakers.some(
                  (t) =>
                    t.participant.id === e.id &&
                    t.participant.clientId === e.clientId,
                ) && this.processActiveSpeakers(),
                (null === (t = this.lastDominantSpeaker) || void 0 === t
                  ? void 0
                  : t.participant.id) === e.id &&
                  (null === (i = this.lastDominantSpeaker) || void 0 === i
                    ? void 0
                    : i.participant.clientId) === e.clientId &&
                  ((this.dominantSpeaker = null),
                  (this.lastDominantSpeaker = null)),
                r.info(
                  `[199] [CallId: ${null === (n = this.call) || void 0 === n ? void 0 : n.id}] Removed participant from active speaker detection: ${e.getFullId()}`,
                ));
            }
            getAudioLevel(e) {
              var t, i;
              const n = this.getParticipantKey(e);
              return null !==
                (i =
                  null === (t = this.speakingStates.get(n)) || void 0 === t
                    ? void 0
                    : t.smoothedAudioLevel) && void 0 !== i
                ? i
                : null;
            }
            isSpeaking(e) {
              var t, i;
              const n = this.getParticipantKey(e);
              return (
                null !==
                  (i =
                    null === (t = this.speakingStates.get(n)) || void 0 === t
                      ? void 0
                      : t.isSpeaking) &&
                void 0 !== i &&
                i
              );
            }
            isDominantSpeaker(e) {
              var t, i;
              return (
                (null === (t = this.dominantSpeaker) || void 0 === t
                  ? void 0
                  : t.participant.id) === e.id &&
                (null === (i = this.dominantSpeaker) || void 0 === i
                  ? void 0
                  : i.participant.clientId) === e.clientId
              );
            }
            processActiveSpeakers() {
              const e = Date.now(),
                t = new Map();
              (this.speakingStates.forEach((i, n) => {
                t.set(n, this.updateSpeakingState(i, e));
              }),
                (this.speakingStates = t));
              const i = Array.from(this.speakingStates.values())
                .filter((e) => e.isSpeaking)
                .sort((e, t) => t.smoothedAudioLevel - e.smoothedAudioLevel);
              (JSON.stringify(i) !== JSON.stringify(this.lastActiveSpeakers) &&
                ((this.activeSpeakers = i), (this.lastActiveSpeakers = i)),
                this.updateDominantSpeaker(i, e));
            }
            updateDominantSpeaker(e, t) {
              if (0 === e.length)
                return void (
                  this.lastDominantSpeaker &&
                  t - this.dominantSpeakerLastChangeTime >
                    s.DOMINANT_SPEAKER_HYSTERESIS_MS &&
                  ((this.dominantSpeaker = null),
                  (this.lastDominantSpeaker = null))
                );
              if (!this.lastDominantSpeaker)
                return (
                  (this.dominantSpeaker = e[0]),
                  (this.lastDominantSpeaker = e[0]),
                  void (this.dominantSpeakerLastChangeTime = t)
                );
              const i = e[0];
              (i.participant.id === this.lastDominantSpeaker.participant.id &&
                i.participant.clientId ===
                  this.lastDominantSpeaker.participant.clientId) ||
                (i.smoothedAudioLevel > 0.5 &&
                  t - i.speakingStartTime > s.DOMINANT_SPEAKER_HYSTERESIS_MS &&
                  ((this.dominantSpeaker = i),
                  (this.lastDominantSpeaker = i),
                  (this.dominantSpeakerLastChangeTime = t)));
            }
            updateSpeakingState(e, t) {
              const i =
                e.audioLevel > e.smoothedAudioLevel
                  ? Math.max(
                      e.smoothedAudioLevel,
                      e.smoothedAudioLevel +
                        (e.audioLevel - e.smoothedAudioLevel) *
                          s.ACTIVE_LEVEL_BOOST,
                    )
                  : Math.max(
                      0,
                      e.smoothedAudioLevel -
                        (e.smoothedAudioLevel - e.audioLevel) *
                          s.ACTIVE_LEVEL_DECAY,
                    );
              let n = e.isSpeaking,
                a = e.speakingStartTime;
              return (
                i >= s.AUDIO_LEVEL_THRESHOLD
                  ? e.isSpeaking || ((n = !0), (a = t))
                  : e.isSpeaking &&
                    t - e.speakingStartTime > s.SPEAKING_TIME_THRESHOLD_MS &&
                    (n = !1),
                Object.assign(Object.assign({}, e), {
                  smoothedAudioLevel: i,
                  isSpeaking: n,
                  speakingStartTime: a,
                })
              );
            }
            processAudioLevels(e, t) {
              var i;
              try {
                let i = null;
                if (e.muted) i = 0;
                else if ("number" == typeof t) i = t;
                else {
                  const e = Array.from(t.values())
                    .filter(
                      (e) =>
                        this.isOutboundAudio(e) || this.isMediaSourceAudio(e),
                    )
                    .map((e) => this.getStatsAudioLevel(e))
                    .filter((e) => null !== e);
                  i = e.length > 0 ? Math.max(...e) : 0;
                }
                if (null !== i) {
                  const t = this.getParticipantKey(e),
                    n = this.speakingStates.get(t);
                  n &&
                    this.speakingStates.set(
                      t,
                      Object.assign(Object.assign({}, n), { audioLevel: i }),
                    );
                }
              } catch (e) {
                r.error(
                  `[330] [CallId: ${null === (i = this.call) || void 0 === i ? void 0 : i.id}] Error processing audio levels: ${e instanceof Error ? e.message : JSON.stringify(e)}`,
                  { color: "red" },
                );
              }
            }
            getParticipantKey(e) {
              return `${e.id}/${e.clientId}`;
            }
            isOutboundAudio(e) {
              return "outbound-rtp" === e.type && "audio" === e.kind;
            }
            isMediaSourceAudio(e) {
              return "media-source" === e.type && "audio" === e.kind;
            }
            getStatsAudioLevel(e) {
              var t;
              return null !== (t = e.audioLevel) && void 0 !== t ? t : null;
            }
            isInboundAudio(e) {
              return "inbound-rtp" === e.type && "audio" === e.kind;
            }
          }
          ((t.ActiveSpeakerManager = s),
            (s.AUDIO_LEVEL_THRESHOLD = 0.1),
            (s.SPEAKING_TIME_THRESHOLD_MS = 250),
            (s.DOMINANT_SPEAKER_HYSTERESIS_MS = 1e3),
            (s.ACTIVE_LEVEL_DECAY = 0.2),
            (s.ACTIVE_LEVEL_BOOST = 1.5),
            (s.POLLING_INTERVAL_MS = 150));
        },
        250: (e, t) => {
          (Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.AudioTrack = void 0),
            (t.AudioTrack = class {
              constructor(e) {
                ((this._enabled = !0), (this.id = e.id), (this.audioTrack = e));
              }
              set enabled(e) {
                ((this._enabled = e), (this.audioTrack.enabled = e));
              }
              get enabled() {
                return this._enabled;
              }
            }));
        },
        271: (e, t, i) => {
          (Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.SceytCallClient = void 0));
          const n = i(650),
            a = i(645),
            l = i(185),
            r = i(297),
            s = (0, a.createLogger)("CallClient");
          class o extends r.TypedEventEmitter {
            constructor(e) {
              (super(),
                (this.join = (e) => {
                  s.info(`[20] [CallId: ${e.id || "new"}] Join call`, {
                    color: "cyan",
                  });
                  try {
                    const t = this.internalCallHandler.joinCall(e);
                    return (
                      t &&
                        t.activeSpeakerManager.addParticipant(
                          t.localParticipant,
                        ),
                      t
                    );
                  } catch (t) {
                    throw (
                      s.error(
                        `[29] [CallId: ${e.id || "new"}] Join failed: ${t.message || JSON.stringify(t)}`,
                        { color: "red" },
                      ),
                      t
                    );
                  }
                }),
                (this.reject = (e, t) => {
                  if (e)
                    try {
                      s.info(`[41] [CallId: ${e.id}] Rejecting call`, {
                        color: "cyan",
                      });
                      const i = this.getCall(e.id);
                      if (i) {
                        const e = this.internalCallHandler.rejectCall(i, t);
                        return (
                          i.activeSpeakerManager.removeParticipant(
                            i.localParticipant,
                          ),
                          e
                        );
                      }
                      return;
                    } catch (t) {
                      throw (
                        s.error(
                          `[51] [CallId: ${e.id}] Rejection failed: ${t.message || JSON.stringify(t)}`,
                          { color: "red" },
                        ),
                        t
                      );
                    }
                  else
                    s.warn(
                      "[39] [CallId: GLOBAL_LOGS] [REJECT] Attempted to reject a null call",
                    );
                }),
                (this.leave = (e) => {
                  if (e)
                    try {
                      s.info(`[62] [CallId: ${e.id}] Leaving call`, {
                        color: "cyan",
                      });
                      const t = this.getCall(e.id);
                      if (t) {
                        const e = this.internalCallHandler.leaveCall(
                          t,
                          !0,
                          "leave",
                        );
                        return (
                          t.activeSpeakerManager.removeParticipant(
                            t.localParticipant,
                          ),
                          e
                        );
                      }
                      return;
                    } catch (t) {
                      throw (
                        s.error(
                          `[71] [CallId: ${null == e ? void 0 : e.id}] Leave failed: ${t.message || JSON.stringify(t)}`,
                          { color: "red" },
                        ),
                        t
                      );
                    }
                  else
                    s.warn(
                      "[57] [CallId: GLOBAL_LOGS] [LEAVE] Attempted to leave a null call",
                    );
                }),
                (this.getCall = (e) =>
                  this.internalCallHandler.activeCalls.find((t) => t.id === e)),
                (this.getOngoingCalls = () => (
                  this.internalCallHandler.getCalls(),
                  this.internalCallHandler.activeCalls
                )),
                (this.onLog = (e) => (
                  (0, a.addLogListener)(e),
                  () => (0, a.removeLogListener)(e)
                )),
                (this.internalCallHandler = new n.InternalCallHandler(e)),
                this.setupInternalEventBridge());
            }
            setupInternalEventBridge() {
              (this.internalCallHandler.setCallEvent("onInvitedToCall", (e) => {
                this.emit("invitedToCall", { call: e });
              }),
                this.internalCallHandler.setCallEvent(
                  "onOngoingCallsUpdated",
                  (e) => {
                    this.emit("ongoingCallsUpdated", { calls: e });
                  },
                ));
            }
            get activeCalls() {
              return this.internalCallHandler.activeCalls;
            }
            get RecentCallQueryBuilder() {
              return l.RecentCallQueryBuilder;
            }
          }
          t.SceytCallClient = o;
        },
        998: function (e, t, i) {
          var n =
            (this && this.__awaiter) ||
            function (e, t, i, n) {
              return new (i || (i = Promise))(function (a, l) {
                function r(e) {
                  try {
                    o(n.next(e));
                  } catch (e) {
                    l(e);
                  }
                }
                function s(e) {
                  try {
                    o(n.throw(e));
                  } catch (e) {
                    l(e);
                  }
                }
                function o(e) {
                  var t;
                  e.done
                    ? a(e.value)
                    : ((t = e.value),
                      t instanceof i
                        ? t
                        : new i(function (e) {
                            e(t);
                          })).then(r, s);
                }
                o((n = n.apply(e, t || [])).next());
              });
            };
          (Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.Call = void 0));
          const a = i(650),
            l = i(578),
            r = i(547),
            s = i(645),
            o = i(258),
            c = i(297),
            d = (0, s.createLogger)("Call");
          class p extends c.TypedEventEmitter {
            constructor({
              id: e,
              sessionId: t = "",
              mediaFlow: i,
              createdBy: r = "",
              localParticipant: s,
              participants: c,
              metadata: p,
              chatClient: u,
              isCallSilenced: g,
            }) {
              (super(),
                (this.state = l.CallState.Idle),
                (this._localAudioTracks = []),
                (this._localVideoTracks = []),
                (this._muted = !1),
                (this._onHold = !1),
                (this.videoEnabled = !1),
                (this.eventsQueue = new Map()),
                (this.isCallSilenced = !1),
                (this._onAudioTrackAdded = null),
                (this._onVideoTrackAdded = null),
                (this._onParticipantStateChanged = null),
                (this._onParticipantConnectionStateChanged = null),
                (this._onParticipantEvent = null),
                (this._onCallStateChanged = null),
                (this._onParticipantsAdded = null),
                (this._onActiveSpeakersChanged = null),
                (this._onDominantSpeakerChanged = null),
                (this._onAudioTrackRemoved = null),
                (this._onVideoTrackRemoved = null),
                (this._onCallMediaFlowChanged = null),
                (this.videoDeviceId = null),
                (this.getStats = () =>
                  n(this, void 0, void 0, function* () {
                    const e = [];
                    for (const t of this.participants) {
                      const i = yield this.getParticipantStats(t);
                      i && e.push(i);
                    }
                    return e;
                  })),
                (this.getParticipantStats = (e) =>
                  n(this, void 0, void 0, function* () {
                    d.info(
                      `[503] [CallId: ${this.id}] getParticipantStats for ${e.getFullId()}`,
                      { color: "cyan" },
                    );
                    const t =
                        a.InternalCallHandler.getInstance()
                          .callParticipantsRTCMap[this.id],
                      i = null == t ? void 0 : t[e.getFullId()];
                    return i ? yield i.getConnectionStats() : null;
                  })),
                (this.id = e),
                (this.sessionId = t),
                (this.createdBy = r),
                (this.participants = c),
                (this.localParticipant = s),
                (this.mediaFlow = i),
                (this.metadata = p),
                (this.activeSpeakerManager = new o.ActiveSpeakerManager(this)),
                (this.chatClient = u),
                (this.isCallSilenced = g));
            }
            emitAudioTrackAdded(e, t) {
              var i;
              (this.emit("audioTrackAdded", {
                call: this,
                participant: e,
                track: t,
              }),
                null === (i = this._onAudioTrackAdded) ||
                  void 0 === i ||
                  i.call(this, this, e, t));
            }
            emitAudioTrackRemoved(e) {
              var t;
              (this.emit("audioTrackRemoved", { call: this, participant: e }),
                null === (t = this._onAudioTrackRemoved) ||
                  void 0 === t ||
                  t.call(this, this, e));
            }
            emitVideoTrackAdded(e, t) {
              var i;
              (this.emit("videoTrackAdded", {
                call: this,
                participant: e,
                track: t,
              }),
                null === (i = this._onVideoTrackAdded) ||
                  void 0 === i ||
                  i.call(this, this, e, t));
            }
            emitVideoTrackRemoved(e) {
              var t;
              (this.emit("videoTrackRemoved", { call: this, participant: e }),
                null === (t = this._onVideoTrackRemoved) ||
                  void 0 === t ||
                  t.call(this, this, e));
            }
            emitCallStateChanged(e) {
              var t;
              (this.emit("callStateChanged", { call: this, state: e }),
                null === (t = this._onCallStateChanged) ||
                  void 0 === t ||
                  t.call(this, this, e));
            }
            emitParticipantStateChanged(e, t, i) {
              var n;
              (this.emit("participantStateChanged", {
                call: this,
                participant: e,
                state: t,
                reason: i,
              }),
                null === (n = this._onParticipantStateChanged) ||
                  void 0 === n ||
                  n.call(this, this, e, t, i));
            }
            emitParticipantConnectionStateChanged(e, t) {
              var i;
              (this.emit("participantConnectionStateChanged", {
                call: this,
                participant: e,
                state: t,
              }),
                null === (i = this._onParticipantConnectionStateChanged) ||
                  void 0 === i ||
                  i.call(this, this, e, t));
            }
            emitParticipantEvent(e, t) {
              var i;
              (this.emit("participantEvent", {
                call: this,
                participant: e,
                event: t,
              }),
                null === (i = this._onParticipantEvent) ||
                  void 0 === i ||
                  i.call(this, this, e, t));
            }
            emitParticipantsAdded(e, t) {
              var i;
              (this.emit("participantsAdded", {
                call: this,
                participants: e,
                entryType: t,
              }),
                null === (i = this._onParticipantsAdded) ||
                  void 0 === i ||
                  i.call(this, this, e, t));
            }
            emitActiveSpeakersChanged(e) {
              var t;
              (this.emit("activeSpeakersChanged", {
                call: this,
                activeSpeakers: e,
              }),
                null === (t = this._onActiveSpeakersChanged) ||
                  void 0 === t ||
                  t.call(this, this, e));
            }
            emitDominantSpeakerChanged(e) {
              var t;
              (this.emit("dominantSpeakerChanged", {
                call: this,
                dominantSpeaker: e,
              }),
                null === (t = this._onDominantSpeakerChanged) ||
                  void 0 === t ||
                  t.call(this, this, e));
            }
            emitMediaFlowChanged(e) {
              var t;
              (this.emit("mediaFlowChanged", { call: this, mediaFlow: e }),
                null === (t = this._onCallMediaFlowChanged) ||
                  void 0 === t ||
                  t.call(this, this, e));
            }
            clearEventsQueue() {
              this.eventsQueue.clear();
            }
            setState(e, t) {
              const i = new r.CallStateMachine(this.id).updateState(
                e,
                this.state,
                t,
              );
              return (
                i &&
                  ((this.state = e),
                  e === l.CallState.Connected
                    ? this.activeSpeakerManager.start(
                        a.InternalCallHandler.getInstance(),
                      )
                    : this.activeSpeakerManager.stop(),
                  this.emitCallStateChanged(e)),
                i
              );
            }
            addParticipants(e) {
              return n(this, void 0, void 0, function* () {
                const t = (e) =>
                  a.InternalCallHandler.getInstance().addParticipantsToCall(
                    e,
                    this,
                  );
                this.sessionId
                  ? t(e)
                  : this.eventsQueue.set("ADD_PARTICIPANTS", () => t(e));
              });
            }
            addParticipantToList(e) {
              this.participants.push(e);
            }
            kickParticipantFromList(e) {
              this.participants = this.participants.filter(
                (t) => t.id !== e.id && t.clientId !== e.clientId,
              );
            }
            setSessionId(e) {
              this.sessionId = e;
            }
            setCreatedBy(e) {
              this.createdBy = e;
            }
            changeMediaFlow(e) {
              this.mediaFlow != e &&
                ((this.mediaFlow = e), this.emitMediaFlowChanged(e));
            }
            switchToSFU() {
              return n(this, void 0, void 0, function* () {
                const e = (e) => {
                  d.info(
                    `[159] [CallId: ${this.id}] handle switch call to ${l.MediaFlow.SFU}`,
                    { color: "cyan" },
                  );
                  const t = a.InternalCallHandler.getInstance(),
                    i = t.activeCalls.find((t) => t.id === e);
                  t.switchCallToSfu(i);
                };
                this.sessionId
                  ? e(this.id)
                  : this.eventsQueue.set(l.SignalEvent.SWITCH_MEDIA_FLOW, () =>
                      e(this.id),
                    );
              });
            }
            mute(e) {
              ((this.muted = e),
                this.localParticipant.setMuted(e),
                this.emitParticipantEvent(
                  this.localParticipant,
                  e ? "Mute" : "Unmute",
                ));
              const t = (e) => {
                a.InternalCallHandler.getInstance().sendAudioEnable(this, e);
              };
              this.sessionId
                ? t(e)
                : this.eventsQueue.set(l.SignalEvent.MUTE, () => t(e));
            }
            hold(e) {
              this.onHold = e;
              const t = (e) => {
                a.InternalCallHandler.getInstance().sendHold(this, e);
              };
              this.sessionId
                ? t(e)
                : this.eventsQueue.set(l.SignalEvent.HOLD, () => t(e));
            }
            set localAudioTracks(e) {
              this._localAudioTracks = e;
            }
            get localAudioTracks() {
              return this._localAudioTracks;
            }
            set localVideoTracks(e) {
              this._localVideoTracks = e;
            }
            get localVideoTracks() {
              return this._localVideoTracks;
            }
            setServerParticipant(e) {
              this.serverParticipant = e;
            }
            set muted(e) {
              this._muted = e;
            }
            get muted() {
              return this._muted;
            }
            set onHold(e) {
              this._onHold = e;
            }
            get onHold() {
              return this._onHold;
            }
            setIsCallSilenced(e) {
              this.isCallSilenced = e;
            }
            getIsCallSilenced() {
              return this.isCallSilenced;
            }
            enableVideo(e) {
              var t, i;
              return n(this, void 0, void 0, function* () {
                const n = a.InternalCallHandler.getInstance();
                let r = [];
                if (
                  (this.localVideoTracks.forEach((e) => {
                    e.stop();
                  }),
                  e)
                ) {
                  const e = yield navigator.mediaDevices.getUserMedia({
                    video: {
                      width: { min: 640, max: 1280 },
                      height: { min: 480, max: 720 },
                    },
                  });
                  ((r = e.getVideoTracks()),
                    r.sort((e, t) =>
                      (e.getSettings().deviceId || "") === this.videoDeviceId
                        ? -1
                        : 1,
                    ),
                    (this.videoDeviceId =
                      (null === (t = r[0]) || void 0 === t
                        ? void 0
                        : t.getSettings().deviceId) || null));
                } else r = this.localVideoTracks;
                (!this.videoDeviceId &&
                  r.length > 0 &&
                  (this.videoDeviceId =
                    (null === (i = r[0]) || void 0 === i
                      ? void 0
                      : i.getSettings().deviceId) || null),
                  (this.localVideoTracks = r),
                  this.localParticipant.setVideoTracks(r),
                  (this.localParticipant.videoEnabled = e),
                  this.emitVideoTrackAdded(this.localParticipant, r[0]),
                  this.emitParticipantEvent(
                    this.localParticipant,
                    e ? "VideoEnabled" : "VideoDisabled",
                  ),
                  this.localParticipant.videoTracks.forEach((t) => {
                    t.enabled = e;
                  }));
                const s = (e, t) => {
                  (n.changeVideoTracks(this, t, e),
                    n.sendVideoEnabled(this, e));
                };
                this.sessionId
                  ? s(e, r[0])
                  : this.eventsQueue.set(
                      e ? l.SignalEvent.VIDEO_ON : l.SignalEvent.VIDEO_OFF,
                      () => s(e, r[0]),
                    );
              });
            }
            shareScreen(e) {
              return n(this, void 0, void 0, function* () {
                let t = [];
                try {
                  if (e) {
                    const e = yield navigator.mediaDevices.getDisplayMedia({
                      video: {
                        width: { max: 1280 },
                        height: { max: 720 },
                        frameRate: { max: 30 },
                      },
                    });
                    ((t = e.getVideoTracks()),
                      e.addEventListener("inactive", () => {
                        this.stopScreenShare();
                      }));
                  } else
                    this.localParticipant.videoEnabled && this.enableVideo(!0);
                  (this.localVideoTracks.forEach((e) => {
                    e.stop();
                  }),
                    (this.localVideoTracks = t),
                    this.localParticipant.setVideoTracks(t),
                    this.localParticipant.setScreenSharing(e),
                    this.emitVideoTrackAdded(this.localParticipant, t[0]),
                    this.emitParticipantEvent(
                      this.localParticipant,
                      e ? "ScreenSharingStarted" : "ScreenSharingStopped",
                    ),
                    this.localParticipant.videoTracks.forEach((t) => {
                      t.enabled = e;
                    }));
                  const i = (e, t) => {
                    a.InternalCallHandler.getInstance().sendScreenShare(
                      this,
                      e,
                      t,
                    );
                  };
                  this.sessionId
                    ? i(e, t[0])
                    : this.eventsQueue.set(
                        e
                          ? l.SignalEvent.SCREEN_SHARE_ON
                          : l.SignalEvent.SCREEN_SHARE_OFF,
                        () => i(e, t[0]),
                      );
                } catch (e) {
                  d.error(
                    `[324] [CallId: ${this.id}] Error sharing screen ${e instanceof Error ? e.message : JSON.stringify(e)}`,
                    { color: "red" },
                  );
                }
              });
            }
            startScreenShare() {
              return n(this, void 0, void 0, function* () {
                return this.shareScreen(!0);
              });
            }
            stopScreenShare() {
              return n(this, void 0, void 0, function* () {
                return this.shareScreen(!1);
              });
            }
            getAvailableVideoDevices() {
              return n(this, void 0, void 0, function* () {
                return (yield navigator.mediaDevices.enumerateDevices()).filter(
                  (e) => "videoinput" === e.kind,
                );
              });
            }
            getAvailableAudioDevices() {
              return n(this, void 0, void 0, function* () {
                return (yield navigator.mediaDevices.enumerateDevices()).filter(
                  (e) => "audioinput" === e.kind,
                );
              });
            }
            selectVideoDevice(e) {
              return n(this, void 0, void 0, function* () {
                ((this.videoDeviceId = e),
                  this.localVideoTracks.forEach((e) => {
                    e.stop();
                  }));
                const t = (yield navigator.mediaDevices.getUserMedia({
                  video: {
                    deviceId: { exact: e },
                    width: { min: 640, max: 1280 },
                    height: { min: 480, max: 720 },
                  },
                })).getVideoTracks();
                ((this.localVideoTracks = t),
                  this.localParticipant.setVideoTracks(t),
                  this.emitVideoTrackAdded(this.localParticipant, t[0]),
                  a.InternalCallHandler.getInstance().changeVideoTracks(
                    this,
                    t[0],
                    this.localParticipant.videoEnabled,
                  ));
              });
            }
            selectAudioDevice(e) {
              return n(this, void 0, void 0, function* () {
                const t = a.InternalCallHandler.getInstance(),
                  i = (yield navigator.mediaDevices.getUserMedia({
                    audio: { deviceId: { exact: e } },
                  })).getAudioTracks();
                ((this.localAudioTracks = i),
                  this.localParticipant.setAudioTracks(i),
                  t.changeAudioTracks(this, i[0], this.localParticipant.muted));
              });
            }
            setVideoEnabled(e) {
              this.videoEnabled = e;
            }
            getParticipant(e, t) {
              return this.participants.find(
                (i) => i.id === e && i.clientId === t,
              );
            }
            sendRinging() {
              return a.InternalCallHandler.getInstance().sendRinging(this);
            }
            toJson() {
              return {
                id: this.id,
                sessionId: this.sessionId,
                mediaFlow: this.mediaFlow,
                participants: this.participants,
                localParticipant: this.localParticipant,
                createdBy: this.createdBy,
                metadata: this.metadata,
                state: this.state,
                activeSpeakerManager: this.activeSpeakerManager,
                eventsQueue: this.eventsQueue,
                chatClient: this.chatClient,
                serverParticipant: this.serverParticipant,
                videoEnabled: this.videoEnabled,
                onHold: this.onHold,
                localAudioTracks: this.localAudioTracks,
                localVideoTracks: this.localVideoTracks,
                muted: this.muted,
                isCallSilenced: this.isCallSilenced,
              };
            }
          }
          t.Call = p;
        },
        228: (e, t, i) => {
          (Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.checkCode = t.toCallException = t.handleAck = void 0));
          const n = i(65);
          function a(e, t) {
            switch (e) {
              case 4e3:
                return n.SceytCallException.BadSignal(e, t);
              case 4001:
                return n.SceytCallException.CallNotFound(e, t);
              case 4002:
                return n.SceytCallException.ParticipantNotFound(e, t);
              case 4005:
              case 4003:
                return n.SceytCallException.NotAllowed(e, t);
              case 4004:
                return n.SceytCallException.ParticipantAlreadyExists(e, t);
              case 5001:
                return n.SceytCallException.InternalError(e, t);
              case 9901:
              case 9903:
              case 9904:
                return n.SceytCallException.NetworkError(e, t);
              case 9902:
                return n.SceytCallException.Timeout(e, t);
              default:
                return n.SceytCallException.Unknown(e, t);
            }
          }
          ((t.handleAck = function (e) {
            return (e.error && a(e.error.code, e.error.message), e);
          }),
            (t.toCallException = function (e) {
              try {
                if (null == e ? void 0 : e.code) return a(e.code, e.message);
              } catch (e) {
                if (e instanceof n.SceytCallException) return e;
              }
              return n.SceytCallException.Unknown(
                void 0,
                (null == e ? void 0 : e.message) || String(e),
              );
            }),
            (t.checkCode = a));
        },
        65: (e, t) => {
          (Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.SceytCallException = void 0));
          class i extends Error {
            get isResendable() {
              return this._isResendable;
            }
            constructor(e, t, i = "SceytCallException") {
              (super(e),
                (this.code = t),
                (this.name = i),
                (this._isResendable = !1),
                (this.name = i));
            }
            static BadSignal(e, t) {
              return new i(t, e, "BadSignal");
            }
            static CallNotFound(e, t) {
              return new i(t, e, "CallNotFound");
            }
            static ParticipantNotFound(e, t) {
              return new i(t, e, "ParticipantNotFound");
            }
            static NotAllowed(e, t) {
              return new i(t, e, "NotAllowed");
            }
            static ParticipantAlreadyExists(e, t) {
              return new i(t, e, "ParticipantAlreadyExists");
            }
            static InternalError(e, t) {
              const n = new i(t, e, "InternalError");
              return ((n._isResendable = !0), n);
            }
            static NetworkError(e, t) {
              const n = new i(t, e, "NetworkError");
              return ((n._isResendable = !0), n);
            }
            static Timeout(e, t) {
              const n = new i(t, e, "Timeout");
              return ((n._isResendable = !0), n);
            }
            static Unknown(e, t) {
              return new i(t, e);
            }
          }
          t.SceytCallException = i;
        },
        681: (e, t) => {
          (Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.SceytChatError = void 0));
          class i extends Error {
            constructor(e, t, i, n) {
              (super(e),
                (this.type = i),
                (this.code = t),
                (this.traceId = n),
                (this.name = "SceytCallError"));
            }
          }
          t.SceytChatError = i;
        },
        650: function (e, t, i) {
          var n =
            (this && this.__awaiter) ||
            function (e, t, i, n) {
              return new (i || (i = Promise))(function (a, l) {
                function r(e) {
                  try {
                    o(n.next(e));
                  } catch (e) {
                    l(e);
                  }
                }
                function s(e) {
                  try {
                    o(n.throw(e));
                  } catch (e) {
                    l(e);
                  }
                }
                function o(e) {
                  var t;
                  e.done
                    ? a(e.value)
                    : ((t = e.value),
                      t instanceof i
                        ? t
                        : new i(function (e) {
                            e(t);
                          })).then(r, s);
                }
                o((n = n.apply(e, t || [])).next());
              });
            };
          (Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.InternalCallHandler = void 0));
          const a = i(787),
            l = i(546),
            r = i(786),
            s = i(578),
            o = i(998),
            c = i(489),
            d = i(645),
            p = i(429),
            u = i(65),
            g = i(680),
            h = (0, d.createLogger)("InternalCallHandler");
          class S {
            constructor(e) {
              ((this.callParticipantsRTCMap = {}),
                (this.activeCalls = []),
                (this.callEvents = {}),
                (this.handleMediaConnectedSignal = (e) => {
                  if (!this.activeCalls) return;
                  const t = this.activeCalls.find((t) => t.id === e.callId);
                  if (t) {
                    let i =
                      null == t
                        ? void 0
                        : t.participants.find((t) => t.getFullId() === e.from);
                    if (
                      (i ||
                        ((i = t.participants.find(
                          (t) => t.id === e.from.split("/")[0] && !t.clientId,
                        )),
                        i
                          ? (i.clientId = e.from.split("/")[1])
                          : ((i = new a.Participant(e.from)),
                            t.addParticipantToList(i),
                            t.emitParticipantsAdded(
                              [i],
                              s.ParticipantEntryType.ADDED,
                            ))),
                      i &&
                        t.localParticipant.state ===
                          s.ParticipantState.Joined &&
                        t.localParticipant.getFullId() !== i.getFullId() &&
                        (!this.callParticipantsRTCMap[t.id] ||
                          !this.callParticipantsRTCMap[t.id][i.getFullId()] ||
                          (null == i ? void 0 : i.shouldResetPeerConnection)))
                    ) {
                      const e = (e) => {
                        e instanceof u.SceytCallException || e instanceof Error
                          ? h.error(
                              `[968] [CallId: ${t.id}] SYNC CONNECT failed message: ${e.message} code: ${e instanceof u.SceytCallException ? e.code : ""}`,
                            )
                          : e.event === s.SignalEvent.ERROR &&
                            h.error(
                              `[971] [CallId: ${t.id}] SYNC CONNECT failed message: ${e.error ? `${e.error.message} code: ${e.error.code}` : ""}`,
                            );
                      };
                      (h.info(
                        `[975] [CallId: ${t.id}] SYNC CONNECT to participant ${i.getFullId()}`,
                        { color: "blue" },
                      ),
                        this.signalingClient.clearParticipantSignals(
                          t.id,
                          i.getFullId(),
                        ),
                        this.signalingClient.sendSignalMessage(
                          {
                            to: i.getFullId(),
                            event: s.SignalEvent.CONNECT,
                            mediaFlow: t.mediaFlow,
                            callId: t.id,
                            sessionId: t.sessionId,
                          },
                          e,
                        ));
                    }
                  }
                }),
                (this.onIceCandidate = (e, t, i) => {
                  var n, a;
                  if (i.mediaFlow !== s.MediaFlow.SFU)
                    if (
                      (h.info(
                        `[996] [CallId: ${i.id}] onIceCandidate, participantID: ${e.getFullId()}, candidate: ${null === (n = t.candidate) || void 0 === n ? void 0 : n.candidate}, type: ${null === (a = t.candidate) || void 0 === a ? void 0 : a.type}`,
                        { color: "blue" },
                      ),
                      t.candidate && t.candidate.candidate)
                    ) {
                      let n = "";
                      if (
                        !/\bufrag\s+\S+/i.test(t.candidate.candidate) &&
                        this.callParticipantsRTCMap[i.id] &&
                        this.callParticipantsRTCMap[i.id][e.getFullId()]
                      ) {
                        const t =
                          this.callParticipantsRTCMap[i.id][e.getFullId()];
                        t && (n = ` ufrag ${t.getLocalSdpUfrag()}`);
                      }
                      const a = {
                        candidate: t.candidate.candidate + n,
                        sdpMid: t.candidate.sdpMid || "",
                        sdpMLineIndex: t.candidate.sdpMLineIndex || 0,
                      };
                      try {
                        const t = (e) => {
                          e instanceof u.SceytCallException ||
                          e instanceof Error
                            ? h.error(
                                `[1007] [CallId: ${i.id}] SYNC ICE failed message: ${e.message} code: ${e instanceof u.SceytCallException ? e.code : ""}`,
                              )
                            : e.event === s.SignalEvent.ERROR &&
                              h.error(
                                `[1011] [CallId: ${i.id}] SYNC ICE failed message: ${e.error ? `${e.error.message} code: ${e.error.code}` : ""}`,
                              );
                        };
                        this.signalingClient.sendSignalMessage(
                          {
                            to: this.getParticipantId(e),
                            event: s.SignalEvent.ICE,
                            mediaFlow: i.mediaFlow,
                            callId: i.id,
                            sessionId: i.sessionId,
                            ice: a,
                          },
                          t,
                        );
                      } catch (t) {
                        h.error(
                          `[1023] [CallId: ${i.id}] Failed to send ICE candidate to ${e.getFullId()}: ${t instanceof Error ? t.message : JSON.stringify(t)}`,
                        );
                      }
                    } else
                      h.info(
                        `[1025] [CallId: ${i.id}] ICE gathering complete for participant ${e.getFullId()} (null candidate)`,
                        { color: "blue" },
                      );
                  else
                    h.info(
                      `[1024] [CallId: ${i.id}] onIceCandidate, participantID: ${e.getFullId()}, skip for SFU`,
                      { color: "blue" },
                    );
                }),
                (this.onTrack = (e, t, i) => {
                  const n = null == i ? void 0 : i.track;
                  (h.info(
                    `[1032] [CallId: ${e.id}] onTrack, participantID: ${t.getFullId()}, kind: ${n.kind}`,
                    { color: "blue" },
                  ),
                    "audio" === (null == n ? void 0 : n.kind)
                      ? (t.setAudioTracks([n]),
                        e.emitAudioTrackAdded(t, n),
                        (n.onended = () => {
                          (h.info(
                            `[1038] [CallId: ${e.id}] Audio track ended for participant ${t.getFullId()}`,
                            { color: "yellow" },
                          ),
                            t.setAudioTracks([]),
                            e.emitAudioTrackRemoved(t));
                        }))
                      : "video" === (null == n ? void 0 : n.kind) &&
                        (t.setVideoTracks([n]),
                        e.videoEnabled &&
                          !t.videoEnabled &&
                          e.setVideoEnabled(!0),
                        e.emitVideoTrackAdded(t, n),
                        (n.onended = () => {
                          (h.info(
                            `[1052] [CallId: ${e.id}] Video track ended for participant ${t.getFullId()}`,
                            { color: "yellow" },
                          ),
                            t.setVideoTracks([]),
                            e.emitVideoTrackRemoved(t));
                        })));
                }),
                (this.addParticipantsToCall = (e, t) => {
                  try {
                    if (
                      (e.forEach((e) => {
                        const i = t.participants.filter((t) => t.id === e);
                        if (i.length > 0)
                          for (const e of i)
                            e
                              ? e.state !== s.ParticipantState.Joined &&
                                e.state !== s.ParticipantState.Ringing &&
                                (e.updateState(s.ParticipantState.Idle, t.id),
                                e.updateConnectionState(
                                  s.ParticipantConnectionState.Idle,
                                  t.id,
                                ),
                                t.emitParticipantStateChanged(
                                  e,
                                  s.ParticipantState.Idle,
                                ),
                                t.emitParticipantConnectionStateChanged(
                                  e,
                                  s.ParticipantConnectionState.Idle,
                                ))
                              : (t.addParticipantToList(e),
                                t.emitParticipantsAdded(
                                  [e],
                                  s.ParticipantEntryType.ADDED,
                                ));
                        else {
                          const i = new a.Participant(e);
                          (t.addParticipantToList(i),
                            t.emitParticipantsAdded(
                              [i],
                              s.ParticipantEntryType.ADDED,
                            ));
                        }
                      }),
                      h.info(
                        `[1547] [CallId: ${t.id}] added participants to call: ${e}, callId: ${t.id}`,
                        { color: "light-green" },
                      ),
                      e.length > 0)
                    ) {
                      const i = (e) => {
                        e instanceof u.SceytCallException || e instanceof Error
                          ? h.error(
                              `[1551] [CallId: ${t.id}] SYNC INVITE failed message: ${e.message} code: ${e instanceof u.SceytCallException ? e.code : ""}`,
                              { color: "red" },
                            )
                          : e.event === s.SignalEvent.ERROR &&
                            h.error(
                              `[1555] [CallId: ${t.id}] SYNC INVITE failed message: ${e.error ? `${e.error.message} code: ${e.error.code}` : ""}`,
                              { color: "red" },
                            );
                      };
                      return (
                        this.signalingClient.sendSignalMessage(
                          {
                            callId: t.id,
                            sessionId: t.sessionId,
                            event: s.SignalEvent.INVITE,
                            participants: e.map((e) =>
                              new a.Participant(e).serialize(),
                            ),
                          },
                          i,
                        ),
                        !0
                      );
                    }
                    return !1;
                  } catch (i) {
                    return (
                      h.error(
                        `[1567] [CallId: ${t.id}] Failed to add participants to call: ${e}, callId: ${t.id} message: ${i instanceof Error ? i.message : JSON.stringify(i)}`,
                        { color: "red" },
                      ),
                      !1
                    );
                  }
                }),
                (this.sendSignalScreenShare = (e, t) => {
                  try {
                    const i = (t) => {
                      t instanceof u.SceytCallException || t instanceof Error
                        ? h.error(
                            `[1679] [CallId: ${e.id}] SYNC SCREEN_SHARE_ON failed message: ${t.message} code: ${t instanceof u.SceytCallException ? t.code : ""}`,
                          )
                        : t.event === s.SignalEvent.ERROR &&
                          h.error(
                            `[1683] [CallId: ${e.id}] SYNC SCREEN_SHARE_ON failed message: ${t.error ? `${t.error.message} code: ${t.error.code}` : ""}`,
                          );
                    };
                    return (
                      this.signalingClient.sendSignalMessage(
                        {
                          mediaFlow: e.mediaFlow,
                          callId: e.id,
                          event: t
                            ? s.SignalEvent.SCREEN_SHARE_ON
                            : s.SignalEvent.SCREEN_SHARE_OFF,
                          sessionId: e.sessionId,
                        },
                        i,
                      ),
                      !0
                    );
                  } catch (t) {
                    return (
                      h.error(
                        `[1694] [CallId: ${e.id}] Failed to send screen share signal: message: ${t instanceof Error ? t.message : JSON.stringify(t)}`,
                        { color: "red" },
                      ),
                      !1
                    );
                  }
                }),
                (this.setupMediaStream = (e) =>
                  n(this, void 0, void 0, function* () {
                    try {
                      const t = yield navigator.mediaDevices.getUserMedia({
                          video: !1,
                          audio: !0,
                        }),
                        i = (0, c.getEmptyVideoTrack)(),
                        n = t.getAudioTracks();
                      return (
                        (e.localAudioTracks = n),
                        i.forEach((e) => (e.enabled = !1)),
                        (e.localVideoTracks = i),
                        e.localParticipant.setVideoTracks(i),
                        (e.localParticipant.audioTracks = n),
                        { videoTracks: i, audioTracks: n }
                      );
                    } catch (t) {
                      throw (
                        h.error(
                          `[1945] [CallId: ${e.id}] Failed to get media: message: ${t instanceof Error ? t.message : JSON.stringify(t)}`,
                        ),
                        t
                      );
                    }
                  })),
                (this.chatClient = e),
                (this.user = e.user),
                (this.clientId = e.clientId),
                (this.signalingClient = new r.Signaling(
                  e,
                  this.handleSignalMessage.bind(this),
                )));
              const t = new this.chatClient.ConnectionListener();
              if (
                ((t.onConnectionStateChanged = (e) => {
                  if (
                    (h.info(
                      `[46] [CallId: GLOBAL_LOGS] Signaling connection state changed: ${e}`,
                      { color: "cyan" },
                    ),
                    "Connected" === e)
                  ) {
                    this.activeCalls.forEach((e) => {
                      const t = this.signalingClient.signalingQueues.get(e.id);
                      t && t.triggerSignalProcessing();
                    });
                    const e = setTimeout(() => {
                      (this.signalingClient.sendSignalMessage(
                        { event: s.SignalEvent.GET_CALL, callId: "" },
                        (e) => {
                          e instanceof u.SceytCallException ||
                          e instanceof Error
                            ? h.error(
                                `[57] [CallId: GLOBAL_LOGS] SYNC GET_CALL signal sent failed ${e instanceof u.SceytCallException || e instanceof Error ? e.message : JSON.stringify(e)}`,
                                { color: "red" },
                              )
                            : e.event !== s.SignalEvent.ERROR
                              ? this.syncActiveCalls(e)
                              : h.error(
                                  "[63] [CallId: GLOBAL_LOGS] SYNC GET_CALL signal sent failed message: " +
                                    (e.error
                                      ? `${e.error.message} code: ${e.error.code}`
                                      : ""),
                                  { color: "red" },
                                );
                        },
                        "get_call",
                      ),
                        clearTimeout(e));
                    }, 1e3);
                  }
                }),
                this.chatClient.addConnectionListener("listener_id", t),
                "Connected" === this.chatClient.connectionState)
              ) {
                const e = setTimeout(() => {
                  (this.signalingClient.sendSignalMessage(
                    { event: s.SignalEvent.GET_CALL, callId: "" },
                    (e) => {
                      e instanceof u.SceytCallException || e instanceof Error
                        ? h.error(
                            `[74] [CallId: GLOBAL_LOGS] SYNC GET_CALL signal sent failed message: ${e.message} code: ${e instanceof u.SceytCallException ? e.code : ""}`,
                            { color: "red" },
                          )
                        : e.event !== s.SignalEvent.ERROR
                          ? this.syncActiveCalls(e)
                          : h.error(
                              "[77] [CallId: GLOBAL_LOGS] SYNC GET_CALL signal sent failed message: " +
                                (e.error
                                  ? `${e.error.message} code: ${e.error.code}`
                                  : ""),
                              { color: "red" },
                            );
                    },
                    "get_call",
                  ),
                    clearTimeout(e));
                }, 1e3);
              }
              S.instance = this;
            }
            syncActiveCalls(e) {
              var t, i, n;
              const l = this.activeCalls;
              try {
                if (
                  !(null == e ? void 0 : e.calls) &&
                  !(null == e ? void 0 : e.calls)
                )
                  return;
                if (e.event !== s.SignalEvent.SUCCESS)
                  return void h.error(
                    "[98] [CallId: GLOBAL_LOGS] Failed to get call information after reconnection message: " +
                      (e.error
                        ? `${e.error.message} code: ${e.error.code}`
                        : ""),
                    { color: "red" },
                  );
                for (const r of l) {
                  if (!(null == r ? void 0 : r.sessionId)) {
                    h.warn(
                      `[105] [CallId: ${r.id}] Call has no sessionId, skipping`,
                    );
                    continue;
                  }
                  const l = e.calls.find(
                    (e) =>
                      (null == e ? void 0 : e.id) === r.id &&
                      (null == e ? void 0 : e.sessionId) === r.sessionId,
                  );
                  if (l)
                    if (
                      (r.mediaFlow !== s.MediaFlow.SFU &&
                        l.mediaFlow === s.MediaFlow.SFU &&
                        (this.updateCallMetadata(r, l),
                        this.handleMediaFlowSwitch(r)),
                      this.syncParticipants(r, l.participants),
                      r.localParticipant.state <= s.ParticipantState.Joined &&
                        (r.state === s.CallState.Connected ||
                          r.state === s.CallState.Connecting))
                    ) {
                      for (const e of r.participants)
                        if (
                          r.mediaFlow !== s.MediaFlow.SFU &&
                          e.connectionState ===
                            s.ParticipantConnectionState.Connected &&
                          e.id !== r.localParticipant.id &&
                          e.clientId !== r.localParticipant.clientId
                        ) {
                          const e = (e) => {
                            e instanceof u.SceytCallException ||
                            e instanceof Error
                              ? h.error(
                                  `[139] [CallId: ${r.id}] SYNC MEDIA_CONNECTED signal sent failed message: ${e.message} code: ${e instanceof u.SceytCallException ? e.code : ""}`,
                                  { color: "red" },
                                )
                              : e.event === s.SignalEvent.ERROR &&
                                h.error(
                                  `[143] [CallId: ${r.id}] SYNC MEDIA_CONNECTED signal sent failed message: ${e.error ? `${e.error.message} code: ${e.error.code}` : ""}`,
                                  { color: "red" },
                                );
                          };
                          this.signalingClient.sendSignalMessage(
                            {
                              event: s.SignalEvent.MEDIA_CONNECTED,
                              callId: r.id,
                              sessionId: r.sessionId,
                              mediaFlow: r.mediaFlow,
                              to: r.id,
                            },
                            e,
                          );
                        }
                      if (
                        r.mediaFlow === s.MediaFlow.SFU &&
                        (null === (t = r.serverParticipant) || void 0 === t
                          ? void 0
                          : t.connectionState) ===
                          s.ParticipantConnectionState.Connected &&
                        r.state === s.CallState.Connected
                      ) {
                        const e = (e) => {
                          e instanceof u.SceytCallException ||
                          e instanceof Error
                            ? h.error(
                                `[158] [CallId: ${r.id}] SYNC MEDIA_CONNECTED signal sent failed message: ${e.message} code: ${e instanceof u.SceytCallException ? e.code : ""}`,
                                { color: "red" },
                              )
                            : e.event === s.SignalEvent.ERROR &&
                              h.error(
                                `[162] [CallId: ${r.id}] SYNC MEDIA_CONNECTED signal sent failed message: ${e.error ? `${e.error.message} code: ${e.error.code}` : ""}`,
                                { color: "red" },
                              );
                        };
                        this.signalingClient.sendSignalMessage(
                          {
                            event: s.SignalEvent.MEDIA_CONNECTED,
                            callId: r.id,
                            sessionId: r.sessionId,
                            mediaFlow: r.mediaFlow,
                            to: r.id,
                          },
                          e,
                        );
                      }
                      if (
                        r.mediaFlow !== s.MediaFlow.SFU ||
                        (this.callParticipantsRTCMap[r.id] &&
                          this.callParticipantsRTCMap[r.id][r.id]) ||
                        r.state !== s.CallState.Connected
                      ) {
                        if (
                          r.mediaFlow === s.MediaFlow.SFU &&
                          r.serverParticipant &&
                          (null === (n = r.serverParticipant) || void 0 === n
                            ? void 0
                            : n.connectionState) !==
                            s.ParticipantConnectionState.Reconnecting &&
                          r.state === s.CallState.Connected
                        ) {
                          const e = (e) => {
                            e instanceof u.SceytCallException ||
                            e instanceof Error
                              ? h.error(
                                  `[199] [CallId: ${r.id}] SYNC MEDIA_CONNECTED signal sent failed message: ${e.message} code: ${e instanceof u.SceytCallException ? e.code : ""}`,
                                  { color: "red" },
                                )
                              : e.event === s.SignalEvent.ERROR &&
                                h.error(
                                  `[203] [CallId: ${r.id}] SYNC MEDIA_CONNECTED signal sent failed message: ${e.error ? `${e.error.message} code: ${e.error.code}` : ""}`,
                                  { color: "red" },
                                );
                          };
                          (h.info(
                            `[205] [CallId: ${r.id}] Sending offer to server participant when server participant is not connected: ${r.serverParticipant.getFullId()}`,
                            { color: "yellow" },
                          ),
                            this.sendOfferPeerToPeer(
                              r,
                              r.serverParticipant,
                              e,
                            ));
                        }
                      } else {
                        if (
                          (null === (i = r.serverParticipant) || void 0 === i
                            ? void 0
                            : i.id) !== r.id
                        ) {
                          const e = new a.Participant(r.id);
                          r.setServerParticipant(e);
                        }
                        if (r.serverParticipant) {
                          const e = (e) => {
                            e instanceof u.SceytCallException ||
                            e instanceof Error
                              ? h.error(
                                  `[181] [CallId: ${r.id}] SYNC MEDIA_CONNECTED signal sent failed message: ${e.message} code: ${e instanceof u.SceytCallException ? e.code : ""}`,
                                  { color: "red" },
                                )
                              : e.event === s.SignalEvent.ERROR &&
                                h.error(
                                  `[185] [CallId: ${r.id}] SYNC MEDIA_CONNECTED signal sent failed message: ${e.error ? `${e.error.message} code: ${e.error.code}` : ""}`,
                                  { color: "red" },
                                );
                          };
                          (h.info(
                            `[188] [CallId: ${r.id}] Sending offer to server participant when there is no server participant in the call: ${r.serverParticipant.getFullId()}`,
                            { color: "yellow" },
                          ),
                            this.sendOfferPeerToPeer(
                              r,
                              r.serverParticipant,
                              e,
                            ));
                        }
                      }
                    } else this.leaveCall(r, !1, "syncActiveCalls");
                  else this.closeCall(r);
                }
                const r = this.activeCalls.find(
                  (e) => e.state === s.CallState.Connected,
                );
                (r &&
                  !e.calls.find(
                    (e) => e.id === r.id && e.sessionId === r.sessionId,
                  ) &&
                  this.closeCall(r),
                  (this.activeCalls = this.activeCalls.filter((t) => {
                    var i;
                    return !(
                      !(null === (i = null == e ? void 0 : e.calls) ||
                      void 0 === i
                        ? void 0
                        : i.find((e) => e.id === t.id)) &&
                      t.sessionId &&
                      (t.clearEventsQueue(),
                      t.participants.forEach((e) => {
                        this.signalingClient.clearParticipantSignals(
                          t.id,
                          e.getFullId(),
                        );
                      }),
                      this.signalingClient.clearCallSignals(t.id),
                      1)
                    );
                  })),
                  e.calls.forEach((e) => {
                    !this.activeCalls.find(
                      (t) =>
                        (null == t ? void 0 : t.id) ===
                        (null == e ? void 0 : e.id),
                    ) &&
                      e.id &&
                      e.sessionId &&
                      this.findOrCreateCall(
                        {
                          id: e.id,
                          sessionId: e.sessionId,
                          mediaFlow: e.mediaFlow,
                          participantIds: [],
                          metadata: e.metadata,
                          createdBy: e.createdBy,
                        },
                        e.participants,
                      );
                  }),
                  this.callEvents.onOngoingCallsUpdated &&
                    this.callEvents.onOngoingCallsUpdated(this.activeCalls));
              } catch (e) {
                h.error(
                  `[248] [CallId: GLOBAL_LOGS] Error syncing calls after reconnection: ${e instanceof Error ? e.message : JSON.stringify(e)}`,
                  { color: "red" },
                );
              }
            }
            setCallEvent(e, t) {
              this.callEvents[e] = t;
            }
            handleSignalMessage(e) {
              switch (
                (h.info(
                  `[253] [CallId: ${e.callId}] Received ${s.SignalEvent[e.event]}: ${JSON.stringify(Object.assign({}, e))}`,
                  { color: "green" },
                ),
                e.event || 0)
              ) {
                case s.SignalEvent.OFFER:
                  this.handleOfferSignal(e);
                  break;
                case s.SignalEvent.ANSWER:
                  this.handleAnswerSignal(e);
                  break;
                case s.SignalEvent.JOIN:
                  this.handleJoinSignal(e);
                  break;
                case s.SignalEvent.LEAVE:
                  this.handleLeaveSignal(e);
                  break;
                case s.SignalEvent.INVITE:
                  this.handleInviteSignal(e);
                  break;
                case s.SignalEvent.CLOSE:
                  this.handleCloseSignal(e);
                  break;
                case s.SignalEvent.DECLINE:
                  this.handleDeclineSignal(e);
                  break;
                case s.SignalEvent.RINGING:
                  this.handleRingingSignal(e);
                  break;
                case s.SignalEvent.SWITCH_MEDIA_FLOW:
                  this.handleSwitchMediaFlowSignal(e);
                  break;
                case s.SignalEvent.ICE:
                  this.handleIceSignal(e);
                  break;
                case s.SignalEvent.VIDEO_ON:
                  this.handleVideoOnSignal(e);
                  break;
                case s.SignalEvent.VIDEO_OFF:
                  this.handleVideoOffSignal(e);
                  break;
                case s.SignalEvent.SCREEN_SHARE_ON:
                  this.handleScreenShareOnSignal(e);
                  break;
                case s.SignalEvent.SCREEN_SHARE_OFF:
                  this.handleScreenShareOffSignal(e);
                  break;
                case s.SignalEvent.MUTE:
                  this.handleMuteSignal(e);
                  break;
                case s.SignalEvent.UNMUTE:
                  this.handleUnmuteSignal(e);
                  break;
                case s.SignalEvent.HOLD:
                  this.handleHoldSignal(e);
                  break;
                case s.SignalEvent.UNHOLD:
                  this.handleUnholdSignal(e);
                  break;
                case s.SignalEvent.KICK:
                  this.handleKickSignal(e);
                  break;
                case s.SignalEvent.UPDATE:
                  this.handleUpdateSignal(e);
                  break;
                case s.SignalEvent.NO_ANSWER:
                  this.handleNoAnswerSignal(e);
                  break;
                case s.SignalEvent.MEDIA_CONNECTED:
                  this.handleMediaConnectedSignal(e);
                  break;
                case s.SignalEvent.CONNECT:
                  this.handleConnectSignal(e);
                  break;
                default:
                  h.info(
                    `[254] [CallId: ${e.callId}] unhandled signal message: ${JSON.stringify(e)}`,
                    { color: "green" },
                  );
              }
            }
            getParticipantId(e) {
              return `${e.id}${(null == e ? void 0 : e.clientId) ? "/" + (null == e ? void 0 : e.clientId) : ""}`;
            }
            handleOfferSignal(e) {
              var t, i, a, l;
              if (!this.activeCalls)
                return void h.warn(
                  `[342] [CallId: ${e.callId}] No active calls found for send offer participant: ${e.from}`,
                  { color: "red" },
                );
              let r;
              try {
                const o = this.activeCalls.find((t) => t.id === e.callId);
                if (!o)
                  return void h.warn(
                    `[348] [CallId: ${e.callId}] No active call found for send offer participant: ${e.from}`,
                    { color: "red" },
                  );
                if (o.state !== s.CallState.Connected)
                  return void h.warn(
                    `[353] [CallId: ${e.callId}] Call is not connected for send offer participant: ${e.from}`,
                    { color: "red" },
                  );
                let c =
                  null == o
                    ? void 0
                    : o.participants.find((t) => t.getFullId() === e.from);
                if (c) {
                  r = c.getFullId();
                  const d =
                    this.callParticipantsRTCMap[o.id] &&
                    (null === (t = this.callParticipantsRTCMap[o.id]) ||
                    void 0 === t
                      ? void 0
                      : t[c.getFullId()]);
                  let p = null == d ? void 0 : d.getSessionId();
                  ((!c.shouldResetPeerConnection &&
                    d &&
                    p ===
                      (null === (i = e.sessionData) || void 0 === i
                        ? void 0
                        : i.id)) ||
                    (this.closePeerConnections(o.id, c.getFullId()),
                    o.activeSpeakerManager.removeParticipant(c),
                    this.addParticipantToRTCMap(o, c),
                    c.setShouldResetPeerConnection(!1),
                    (
                      this.callParticipantsRTCMap[o.id] &&
                      (null === (a = this.callParticipantsRTCMap[o.id]) ||
                      void 0 === a
                        ? void 0
                        : a[c.getFullId()])
                    ).setSessionId(
                      (null === (l = e.sessionData) || void 0 === l
                        ? void 0
                        : l.id) || "",
                    )),
                    this.signalingClient.clearParticipantSignals(
                      o.id,
                      c.getFullId(),
                    ),
                    this.setRemoteDescription(
                      o.id,
                      c.getFullId(),
                      (0, g.toSessionDescription)(e.sessionData, "offer"),
                    ).then(() =>
                      n(this, void 0, void 0, function* () {
                        var t, i, n;
                        if (!c)
                          return void h.info(
                            `[392] [CallId: ${e.callId}] Participant not found in call: ${e.from}`,
                            { color: "cyan" },
                          );
                        const a =
                            this.callParticipantsRTCMap[o.id][c.getFullId()],
                          l = this.activeCalls.find((e) => e.id === o.id);
                        (l &&
                          (l.mediaFlow !== s.MediaFlow.SFU ||
                            (l.mediaFlow === s.MediaFlow.SFU &&
                              c.id ===
                                (null ===
                                  (t =
                                    null == l ? void 0 : l.serverParticipant) ||
                                void 0 === t
                                  ? void 0
                                  : t.id))) &&
                          (yield this.addTracksToPeerConnection(
                            o,
                            c.getFullId(),
                            !1,
                          )),
                          a
                            .createAnswer(
                              (null === (i = e.sessionData) || void 0 === i
                                ? void 0
                                : i.id) || "",
                              (null === (n = e.sessionData) || void 0 === n
                                ? void 0
                                : n.version) || "",
                              o.mediaFlow,
                            )
                            .then((t) => {
                              if (!c)
                                return void h.info(
                                  `[392] [CallId: ${e.callId}] Participant not found in call: ${e.from}`,
                                  { color: "cyan" },
                                );
                              if (!t)
                                return void h.error(
                                  `[456] [CallId: ${o.id}] Failed to create answer for participant: ${c.getFullId()}`,
                                  { color: "red" },
                                );
                              const i = a.getRemoteSdpUfrag();
                              if (i && a.iceQueueMap[c.getFullId()]) {
                                const e = a.iceQueueMap[c.getFullId()][i];
                                if (e && e.length > 0)
                                  for (const t of e)
                                    a.addIceCandidate(t, c.getFullId());
                              }
                              this.signalingClient.sendSignalMessage(
                                {
                                  to: e.from,
                                  mediaFlow: e.mediaFlow,
                                  callId: o.id,
                                  event: s.SignalEvent.ANSWER,
                                  sessionData: t,
                                  sessionId: e.sessionId,
                                  metadata: e.metadata,
                                },
                                (e) => {
                                  e instanceof u.SceytCallException ||
                                  e instanceof Error
                                    ? h.error(
                                        `[386] [CallId: ${o.id}] SYNC ANSWER failed message: ${e.message} code: ${e instanceof u.SceytCallException ? e.code : ""}`,
                                        { color: "red" },
                                      )
                                    : e.event === s.SignalEvent.ERROR &&
                                      h.error(
                                        `[389] [CallId: ${o.id}] SYNC ANSWER failed message: ${e.error ? `${e.error.message} code: ${e.error.code}` : ""}`,
                                        { color: "red" },
                                      );
                                },
                              );
                            }));
                      }),
                    ));
                } else
                  h.info(
                    `[402] [CallId: ${e.callId}] Participant not found in call: ${e.from}`,
                    { color: "cyan" },
                  );
              } catch (t) {
                h.error(
                  `[406] [CallId: ${e.callId}] Failed to handle offer: ${r} message: ${t instanceof Error ? t.message : JSON.stringify(t)}`,
                  { color: "red" },
                );
              }
            }
            handleAnswerSignal(e) {
              var t;
              if (this.activeCalls)
                try {
                  const i = this.activeCalls.find((t) => t.id === e.callId);
                  if (i) {
                    let n;
                    if (
                      ((n =
                        i.serverParticipant &&
                        i.serverParticipant.getFullId() === e.from
                          ? i.serverParticipant
                          : i.participants.find(
                              (t) => t.getFullId() === e.from,
                            )),
                      n)
                    ) {
                      const a =
                        null === (t = e.sessionData) || void 0 === t
                          ? void 0
                          : t.version;
                      if (
                        !a ||
                        a !==
                          this.callParticipantsRTCMap[i.id][
                            n.getFullId()
                          ].getVersion()
                      )
                        return void h.warn(
                          `[412] [CallId: ${i.id}] Version is not set or is the same as the current version: ${a}`,
                          { color: "red" },
                        );
                      (this.callParticipantsRTCMap[i.id][
                        n.getFullId()
                      ].setVersion(a),
                        this.setRemoteDescription(
                          i.id,
                          n.getFullId(),
                          (0, g.toSessionDescription)(e.sessionData, "answer"),
                        ).then(() => {
                          if (!n)
                            return void h.info(
                              `[462] [CallId: ${e.callId}] Participant not found in call: ${e.from}`,
                              { color: "cyan" },
                            );
                          const t =
                            this.callParticipantsRTCMap[i.id][
                              n.getFullId()
                            ].getRemoteSdpUfrag();
                          if (
                            t &&
                            this.callParticipantsRTCMap[i.id][n.getFullId()]
                              .iceQueueMap[n.getFullId()]
                          ) {
                            const e =
                              this.callParticipantsRTCMap[i.id][n.getFullId()]
                                .iceQueueMap[n.getFullId()][t];
                            if (e && e.length > 0)
                              for (const t of e)
                                this.callParticipantsRTCMap[i.id][
                                  n.getFullId()
                                ].addIceCandidate(t, n.getFullId());
                          }
                        }));
                    }
                  }
                } catch (t) {
                  h.error(
                    `[435] [CallId: ${e.callId}] Failed to handle answer: ${t instanceof Error ? t.message : JSON.stringify(t)}`,
                    { color: "red" },
                  );
                }
            }
            sendOfferPeerToPeer(e, t, i) {
              return n(this, void 0, void 0, function* () {
                (this.callParticipantsRTCMap.hasOwnProperty(e.id) &&
                  this.callParticipantsRTCMap[e.id].hasOwnProperty(
                    t.getFullId(),
                  )) ||
                  (this.addParticipantToRTCMap(e, t),
                  yield this.addTracksToPeerConnection(e, t.getFullId(), !0));
                const n = this.callParticipantsRTCMap[e.id][t.getFullId()];
                let a = n.getVersion();
                (n.setVersion(a ? String(Number(a) + 1) : "1"),
                  (a = n.getVersion()));
                let l = n.getSessionId();
                (l || ((l = (0, p.v4)()), n.setSessionId(l)),
                  n.createOffer(l, a, e.mediaFlow).then((n) => {
                    n
                      ? this.signalingClient.sendSignalMessage(
                          {
                            mediaFlow: e.mediaFlow,
                            callId: e.id,
                            event: s.SignalEvent.OFFER,
                            sessionData: n,
                            to: t.getFullId(),
                            sessionId: e.sessionId,
                          },
                          i,
                        )
                      : h.error(
                          `[456] [CallId: ${e.id}] Failed to create offer for participant: ${t.getFullId()}`,
                          { color: "red" },
                        );
                  }));
              });
            }
            handleJoinSignal(e) {
              if (this.activeCalls)
                try {
                  const t = this.activeCalls.find((t) => t.id === e.callId);
                  if (t) {
                    let i = !1,
                      n = t.participants.find((t) => t.getFullId() === e.from);
                    if (
                      (n ||
                        ((n = t.participants.find(
                          (t) =>
                            t.id === e.from.split("/")[0] &&
                            (t.clientId === e.from.split("/")[1] ||
                              !t.clientId),
                        )),
                        n ? (n.clientId = e.from.split("/")[1]) : (n = void 0)),
                      !n &&
                        t.localParticipant.screenSharing &&
                        this.sendSignalScreenShare(t, !0),
                      n ||
                        ((n = new a.Participant(e.from)),
                        t.addParticipantToList(n),
                        (i = !0)),
                      t.mediaFlow === s.MediaFlow.P2P &&
                        t.localParticipant.state ===
                          s.ParticipantState.Joined &&
                        this.isPolitePeer(
                          e.from,
                          t.localParticipant.getFullId(),
                        ))
                    ) {
                      const e = (e) => {
                        e instanceof u.SceytCallException || e instanceof Error
                          ? h.error(
                              `[495] [CallId: ${t.id}] SYNC OFFER failed message: ${e.message} code: ${e instanceof u.SceytCallException ? e.code : ""}`,
                              { color: "red" },
                            )
                          : e.event === s.SignalEvent.ERROR &&
                            h.error(
                              `[499] [CallId: ${t.id}] SYNC OFFER failed message: ${e.error ? `${e.error.message} code: ${e.error.code}` : ""}`,
                              { color: "red" },
                            );
                      };
                      (h.info(
                        `[503] [CallId: ${t.id}] Sending offer to participant: ${n.getFullId()}`,
                      ),
                        this.sendOfferPeerToPeer(t, n, e));
                    }
                    (n.updateState(s.ParticipantState.Joined, t.id),
                      h.info(
                        `[503] [CallId: ${t.id}] Participant joined call shouldSendEventInvited: ${i}`,
                      ),
                      i
                        ? t.emitParticipantsAdded(
                            [n],
                            s.ParticipantEntryType.ADDED,
                          )
                        : t.emitParticipantStateChanged(
                            n,
                            s.ParticipantState.Joined,
                          ));
                  }
                } catch (t) {
                  h.error(
                    `[514] [CallId: ${e.callId}] Failed to handle USER_JOINED: message: ${t instanceof Error ? t.message : JSON.stringify(t)}`,
                    { color: "red" },
                  );
                }
            }
            handleLeaveSignal(e) {
              if (!this.activeCalls) return;
              const t = this.activeCalls.find((t) => t.id === e.callId);
              if (t) {
                const i =
                  null == t
                    ? void 0
                    : t.participants.find(
                        (t) =>
                          t.id === e.from.split("/")[0] &&
                          (t.clientId === e.from.split("/")[1] || !t.clientId),
                      );
                i &&
                  i.updateState(s.ParticipantState.Left, t.id) &&
                  (this.closePeerConnections(t.id, i.getFullId()),
                  t.activeSpeakerManager.removeParticipant(i),
                  i.setMuted(!1),
                  t.emitParticipantEvent(i, "Mute"),
                  i.setVideoEnabled(!1),
                  t.emitParticipantEvent(i, "VideoDisabled"),
                  i.setScreenSharing(!1),
                  t.emitParticipantEvent(i, "ScreenSharingStopped"),
                  i.setHold(!1),
                  t.emitParticipantEvent(i, "Unhold"),
                  t.emitParticipantStateChanged(i, s.ParticipantState.Left),
                  i.updateConnectionState(
                    s.ParticipantConnectionState.Idle,
                    t.id,
                  ) &&
                    t.emitParticipantConnectionStateChanged(
                      i,
                      s.ParticipantConnectionState.Idle,
                    ));
              }
            }
            handleInviteSignal(e) {
              if (!e || !e.callId)
                return void h.warn(
                  `[545] [CallId: ${e.callId}] Received invalid invite signal message`,
                );
              const t = this.activeCalls.find((t) => t.id === e.callId),
                i = (null == e ? void 0 : e.to) === this.user.id;
              (i &&
                t &&
                t.participants.forEach((e) => {
                  e.id === this.user.id &&
                    (e.updateConnectionState(
                      s.ParticipantConnectionState.Idle,
                      t.id,
                    ),
                    e.updateState(s.ParticipantState.Idle, t.id),
                    null == t ||
                      t.emitParticipantConnectionStateChanged(
                        e,
                        s.ParticipantConnectionState.Idle,
                      ),
                    null == t ||
                      t.emitParticipantStateChanged(
                        e,
                        s.ParticipantState.Idle,
                      ));
                }),
                t
                  ? this.handleExistingCallInvite(t, e, i)
                  : this.handleNewCallInvite(e, i),
                this.callEvents.onOngoingCallsUpdated &&
                  this.callEvents.onOngoingCallsUpdated(this.activeCalls));
            }
            handleExistingCallInvite(e, t, i) {
              var n, a;
              if (i) {
                e.localParticipant.updateConnectionState(
                  s.ParticipantConnectionState.Connecting,
                  e.id,
                ) &&
                  (e.participants.find(
                    (e) =>
                      e.id === this.user.id && e.clientId === this.clientId,
                  ) || e.addParticipantToList(e.localParticipant),
                  e.emitParticipantConnectionStateChanged(
                    e.localParticipant,
                    s.ParticipantConnectionState.Connecting,
                  ));
                const i =
                  (null ===
                    (a =
                      null === (n = t.participants) || void 0 === n
                        ? void 0
                        : n.find(
                            (e) =>
                              e.id === this.user.id &&
                              e.clientId === this.clientId,
                          )) || void 0 === a
                    ? void 0
                    : a.isCallSilenced) || !1;
                (e.setIsCallSilenced(i),
                  this.callEvents.onInvitedToCall &&
                    this.callEvents.onInvitedToCall(e));
              } else {
                const i = this.addNewParticipantsToCall(e, t);
                i.length > 0 &&
                  e.emitParticipantsAdded(i, s.ParticipantEntryType.ADDED);
              }
            }
            handleNewCallInvite(e, t) {
              var i;
              const n = new a.Participant(this.user.id, this.clientId);
              n.updateConnectionState(
                s.ParticipantConnectionState.Connecting,
                e.callId,
              );
              let l = !1;
              const r =
                null === (i = e.participants) || void 0 === i
                  ? void 0
                  : i.map((t) => {
                      if (t.id === this.user.id && !t.clientId)
                        return ((l = t.isCallSilenced || !1), n);
                      const i = new a.Participant(
                        t.id,
                        null == t ? void 0 : t.clientId,
                      );
                      return (
                        i.updateState(
                          t.state || s.ParticipantState.Idle,
                          e.callId,
                        ),
                        i
                      );
                    });
              if (
                !t &&
                !(null == r
                  ? void 0
                  : r.find((t) => t.getFullId() === e.from)) &&
                e.from.split("/")[0] === this.user.id &&
                e.from.split("/")[1] !== this.clientId
              ) {
                const t = new a.Participant(e.from, e.from.split("/")[1]);
                (t.updateState(s.ParticipantState.Joined, e.callId),
                  null == r || r.push(t));
              }
              const d = (0, c.makeFirstById)(
                  r || [],
                  this.user.id,
                  this.clientId,
                ),
                p = new o.Call({
                  id: e.callId,
                  sessionId: e.sessionId,
                  mediaFlow: e.mediaFlow,
                  createdBy: e.from,
                  localParticipant: n,
                  metadata: e.metadata,
                  participants: d,
                  chatClient: this.chatClient,
                  isCallSilenced: l,
                });
              (this.activeCalls.push(p),
                this.callEvents.onInvitedToCall &&
                  t &&
                  this.callEvents.onInvitedToCall(p),
                this.callEvents.onOngoingCallsUpdated &&
                  this.callEvents.onOngoingCallsUpdated(this.activeCalls));
            }
            addNewParticipantsToCall(e, t) {
              var i;
              const n = [];
              return (
                null === (i = t.participants) ||
                  void 0 === i ||
                  i.forEach((t) => {
                    const i =
                        t.id !== this.user.id
                          ? e.participants.find((e) => e.id === t.id)
                          : void 0,
                      l =
                        i ||
                        new a.Participant(
                          t.id,
                          null == t ? void 0 : t.clientId,
                        );
                    i
                      ? t.state !== s.ParticipantState.Joined &&
                        (l.updateState(
                          t.state || s.ParticipantState.Idle,
                          e.id,
                        ),
                        l.updateConnectionState(
                          s.ParticipantConnectionState.Idle,
                          e.id,
                        ),
                        l.setVideoEnabled(t.videoEnabled || !1),
                        e.emitParticipantStateChanged(
                          l,
                          s.ParticipantState.Idle,
                        ),
                        e.emitParticipantConnectionStateChanged(
                          l,
                          s.ParticipantConnectionState.Idle,
                        ))
                      : (l.updateState(
                          t.state || s.ParticipantState.Idle,
                          e.id,
                        ),
                        n.push(l),
                        e.addParticipantToList(l));
                  }),
                n
              );
            }
            handleCloseSignal(e) {
              if (this.activeCalls) {
                const t = this.activeCalls.find((t) => t.id === e.callId);
                if (!t) return;
                t && this.closeCall(t);
              }
            }
            handleDeclineSignal(e) {
              var t;
              if (!this.activeCalls) return;
              const i = this.activeCalls.find((t) => t.id === e.callId);
              if (i)
                if (
                  this.getParticipantId({
                    id: this.user.id,
                    clientId: this.clientId,
                  }) === e.from
                )
                  (this.leaveCall(i, !0, "handleDeclineSignal"),
                    i.setState(s.CallState.Idle, "handleDeclineSignal"));
                else {
                  let n =
                    null == i
                      ? void 0
                      : i.participants.find((t) => t.getFullId() === e.from);
                  (n ||
                    ((n =
                      null == i
                        ? void 0
                        : i.participants.find(
                            (t) => t.id === e.from.split("/")[0] && !t.clientId,
                          )),
                    n
                      ? (n.clientId = e.from.split("/")[1])
                      : ((n = new a.Participant(e.from)),
                        i.addParticipantToList(n),
                        i.emitParticipantsAdded(
                          [n],
                          s.ParticipantEntryType.ADDED,
                        ))),
                    n &&
                      n.updateState(s.ParticipantState.Declined, i.id) &&
                      i.emitParticipantStateChanged(
                        n,
                        s.ParticipantState.Declined,
                        null === (t = e.metadata) || void 0 === t
                          ? void 0
                          : t.reason,
                      ));
                }
            }
            handleRingingSignal(e) {
              if (!this.activeCalls) return;
              const t = this.activeCalls.find((t) => t.id === e.callId);
              if (t) {
                let i =
                  null == t
                    ? void 0
                    : t.participants.find(
                        (t) =>
                          t.id === e.from.split("/")[0] &&
                          (t.clientId === e.from.split("/")[1] || !t.clientId),
                      );
                (i ||
                  ((i = new a.Participant(e.from)),
                  t.addParticipantToList(i),
                  t.emitParticipantsAdded([i], s.ParticipantEntryType.ADDED)),
                  i &&
                    i.connectionState !==
                      s.ParticipantConnectionState.Connected &&
                    i.updateState(s.ParticipantState.Ringing, t.id) &&
                    t.emitParticipantStateChanged(
                      i,
                      s.ParticipantState.Ringing,
                    ));
              }
            }
            handleSwitchMediaFlowSignal(e) {
              const t = this.activeCalls.find((t) => t.id === e.callId);
              if (t && t.localParticipant.state === s.ParticipantState.Joined) {
                t.changeMediaFlow(s.MediaFlow.SFU);
                const e = new a.Participant(t.id);
                t.setServerParticipant(e);
                const i = (e) => {
                  e instanceof u.SceytCallException || e instanceof Error
                    ? h.error(
                        `[738] [CallId: ${t.id}] SYNC OFFER failed message: ${e.message} code: ${e instanceof u.SceytCallException ? e.code : ""}`,
                      )
                    : e.event === s.SignalEvent.ERROR &&
                      h.error(
                        `[742] [CallId: ${t.id}] SYNC OFFER failed message: ${e.error ? `${e.error.message} code: ${e.error.code}` : ""}`,
                      );
                };
                (h.info(
                  `[747] [CallId: ${t.id}] Sending offer to server participant: ${e.getFullId()}`,
                ),
                  this.sendOfferPeerToPeer(t, e, i),
                  t.participants.forEach((e) => {
                    e.setShouldResetPeerConnection(!0);
                  }));
              } else t && t.changeMediaFlow(s.MediaFlow.SFU);
            }
            handleIceSignal(e) {
              var t;
              if (!e.callId || !e.ice)
                return void h.warn(
                  `[756] [CallId: ${e.callId}] Invalid ICE signal: missing callId or ice data`,
                );
              const i = this.activeCalls.find((t) => t.id === e.callId);
              if (!i)
                return void h.warn(
                  `[763] [CallId: ${e.callId}] ICE candidate received for unknown call: ${e.callId}`,
                );
              const n = i.participants.find((t) => t.getFullId() === e.from);
              if (n)
                try {
                  if (!this.callParticipantsRTCMap[i.id])
                    return void h.error(
                      `[774] [CallId: ${i.id}] No RTC map found for call ${i.id}`,
                    );
                  null ===
                    (t = this.callParticipantsRTCMap[i.id][n.getFullId()]) ||
                    void 0 === t ||
                    t.addIceCandidate(e.ice, n.getFullId());
                } catch (e) {
                  h.error(
                    `[787] [CallId: ${i.id}] Failed to add ICE candidate for participant ${n.getFullId()} in call ${i.id}: ${e instanceof Error ? e.message : JSON.stringify(e)}`,
                  );
                }
              else
                h.warn(
                  `[768] [CallId: ${e.callId}] ICE candidate received from unknown participant: ${e.from} in call ${e.callId}`,
                );
            }
            handleVideoOnSignal(e) {
              if (!this.activeCalls) return;
              const t = this.activeCalls.find((t) => t.id === e.callId);
              if (t) {
                const i =
                  null == t
                    ? void 0
                    : t.participants.find(
                        (t) =>
                          t.getFullId() === e.from ||
                          (t.id === e.from.split("/")[0] && !t.clientId),
                      );
                i &&
                  (i.setVideoEnabled(!0),
                  t.emitParticipantEvent(i, "VideoEnabled"),
                  t.setVideoEnabled(!0));
              }
            }
            handleVideoOffSignal(e) {
              if (!this.activeCalls) return;
              const t = this.activeCalls.find((t) => t.id === e.callId);
              if (t) {
                let i;
                (null == t ||
                  t.participants.forEach((t) => {
                    (t.getFullId() === e.from ||
                      (t.id === e.from.split("/")[0] && !t.clientId)) &&
                      (t.setVideoEnabled(!1), (i = t));
                  }),
                  i && t.emitParticipantEvent(i, "VideoDisabled"));
              }
            }
            handleScreenShareOnSignal(e) {
              if (!this.activeCalls) return;
              const t = this.activeCalls.find((t) => t.id === e.callId);
              if (t) {
                const i =
                  null == t
                    ? void 0
                    : t.participants.find((t) => t.getFullId() === e.from);
                i &&
                  (i.setVideoEnabled(!0),
                  i.setScreenSharing(!0),
                  t.emitParticipantEvent(i, "ScreenSharingStarted"));
              }
            }
            handleScreenShareOffSignal(e) {
              if (!this.activeCalls) return;
              const t = this.activeCalls.find((t) => t.id === e.callId);
              if (t) {
                const i =
                  null == t
                    ? void 0
                    : t.participants.find((t) => t.getFullId() === e.from);
                i &&
                  (i.setVideoEnabled(!1),
                  i.setScreenSharing(!1),
                  t.emitParticipantEvent(i, "ScreenSharingStopped"));
              }
            }
            handleMuteSignal(e) {
              if (!this.activeCalls) return;
              const t = this.activeCalls.find((t) => t.id === e.callId);
              if (t) {
                const i =
                  null == t
                    ? void 0
                    : t.participants.find((t) => t.getFullId() === e.from);
                i && (i.setMuted(!0), t.emitParticipantEvent(i, "Mute"));
              }
            }
            handleUnmuteSignal(e) {
              if (!this.activeCalls) return;
              const t = this.activeCalls.find((t) => t.id === e.callId);
              if (t) {
                const i =
                  null == t
                    ? void 0
                    : t.participants.find((t) => t.getFullId() === e.from);
                i && (i.setMuted(!1), t.emitParticipantEvent(i, "Unmute"));
              }
            }
            handleHoldSignal(e) {
              if (!this.activeCalls) return;
              const t = this.activeCalls.find((t) => t.id === e.callId);
              if (t) {
                const i =
                  null == t
                    ? void 0
                    : t.participants.find((t) => t.getFullId() === e.from);
                i && (i.setHold(!0), t.emitParticipantEvent(i, "Hold"));
              }
            }
            handleUnholdSignal(e) {
              if (!this.activeCalls) return;
              const t = this.activeCalls.find((t) => t.id === e.callId);
              if (t) {
                const i =
                  null == t
                    ? void 0
                    : t.participants.find((t) => t.getFullId() === e.from);
                i && (i.setHold(!1), t.emitParticipantEvent(i, "Unhold"));
              }
            }
            handleKickSignal(e) {
              if (!this.activeCalls) return;
              const t = this.activeCalls.find((t) => t.id === e.callId);
              if (t) {
                const i =
                  null == t
                    ? void 0
                    : t.participants.find((t) => t.getFullId() === e.from);
                i &&
                  i.updateState(s.ParticipantState.Kicked, t.id) &&
                  t.emitParticipantStateChanged(i, s.ParticipantState.Kicked);
              }
            }
            handleUpdateSignal(e) {
              if (!this.activeCalls) return;
              const t = this.activeCalls.find((t) => t.id === e.callId);
              t && e.metadata && (t.metadata = e.metadata);
            }
            handleNoAnswerSignal(e) {
              var t;
              if (!this.activeCalls) return;
              const i = this.activeCalls.find((t) => t.id === e.callId);
              i &&
                (null === (t = e.participants) ||
                  void 0 === t ||
                  t.forEach((e) => {
                    (null == i
                      ? void 0
                      : i.participants.filter(
                          (t) =>
                            t.id === e.id &&
                            (t.clientId === e.clientId || !e.clientId),
                        )
                    ).forEach((e) => {
                      e.updateState(s.ParticipantState.NoAnswer, i.id) &&
                        i.emitParticipantStateChanged(
                          e,
                          s.ParticipantState.NoAnswer,
                        );
                    });
                  }));
            }
            static getInstance() {
              return S.instance;
            }
            setRTCConfig(e) {
              this.rtcConfig = e;
            }
            onIceCandidateListener(e, t) {
              return (i) => {
                this.onIceCandidate(e, i, t);
              };
            }
            onSignalingStateChangeListener(e, t) {
              return (i) => {
                var n;
                const a =
                  (null === (n = null == i ? void 0 : i.currentTarget) ||
                  void 0 === n
                    ? void 0
                    : n.signalingState) || "unknown";
                h.info(
                  `[1067] [CallId: ${t.id}] Signaling state change: ${a}, participantID: ${e.getFullId()}`,
                  { color: "blue" },
                );
              };
            }
            isPolitePeer(e, t) {
              return t > e;
            }
            onIceConnectionStateChangeListener(e, t) {
              return (i) => {
                var n;
                const a =
                  (null === (n = null == i ? void 0 : i.currentTarget) ||
                  void 0 === n
                    ? void 0
                    : n.iceConnectionState) || "unknown";
                h.info(
                  `[1078] [CallId: ${t.id}] ICE connection state change: ${a}, participantID: ${e.getFullId()}`,
                  { color: "blue" },
                );
              };
            }
            onConnectionStateChangeListener(e, t) {
              return (i) => {
                var n, a, l, r, o;
                const c = i.currentTarget.connectionState;
                h.info(
                  `[1078] [CallId: ${t.id}] PC connection state changed: ${c}, participantID: ${e.getFullId()}`,
                  {
                    color:
                      "disconnected" === c
                        ? "orange"
                        : "failed" === c
                          ? "red"
                          : "blue",
                  },
                );
                const d = this.activeCalls.find((e) => e.id === t.id) || t,
                  p =
                    (null == d
                      ? void 0
                      : d.participants.find(
                          (t) => t.getFullId() === e.getFullId(),
                        )) ||
                    (e.id ===
                      (null ===
                        (n = null == d ? void 0 : d.serverParticipant) ||
                      void 0 === n
                        ? void 0
                        : n.id) &&
                      e) ||
                    e;
                let g = 0,
                  S = null;
                const C = (i, n = !1) => {
                    h.info(
                      `[1089] [CallId: ${t.id}] start renegotiation send ${i} to participant ${p.getFullId()}`,
                      { color: "blue" },
                    );
                    const a = (e) => {
                      if (
                        "Connected" === this.chatClient.connectionState &&
                        p.connectionState !==
                          s.ParticipantConnectionState.Connected &&
                        d.state === s.CallState.Connected
                      ) {
                        h.info(
                          `[1190] [CallId: ${t.id}] interval renegotiation send ${i} to participant ${p.getFullId()}`,
                          { color: "blue" },
                        );
                        try {
                          if (
                            "offer" !== i ||
                            (n &&
                              !this.isPolitePeer(
                                p.getFullId(),
                                (null == d
                                  ? void 0
                                  : d.localParticipant.getFullId()) || "",
                              ))
                          ) {
                            if (
                              "connect" === i &&
                              (!n ||
                                this.isPolitePeer(
                                  p.getFullId(),
                                  (null == d
                                    ? void 0
                                    : d.localParticipant.getFullId()) || "",
                                ))
                            ) {
                              h.info(
                                `[1214] [CallId: ${t.id}] ${s.MediaFlow.SFU} sendConnect to participant 1 ${JSON.stringify(p)}`,
                                { color: "blue" },
                              );
                              try {
                                (this.signalingClient.clearParticipantSignals(
                                  t.id,
                                  p.getFullId(),
                                ),
                                  this.signalingClient.sendSignalMessage(
                                    {
                                      mediaFlow: t.mediaFlow,
                                      callId: t.id,
                                      sessionId: t.sessionId,
                                      event: s.SignalEvent.CONNECT,
                                      to: p.getFullId(),
                                    },
                                    e,
                                  ));
                              } catch (e) {
                                h.error(
                                  `[1236] [CallId: ${t.id}] Failed to send connect to participant ${p.getFullId()}: message: ${e instanceof Error ? e.message : JSON.stringify(e)}`,
                                  { color: "red" },
                                );
                              }
                            }
                          } else
                            try {
                              (h.info(
                                `[1211] [CallId: ${t.id}] Sending offer to participant: ${p.getFullId()}`,
                              ),
                                this.sendOfferPeerToPeer(t, p, e));
                            } catch (e) {
                              h.error(
                                `[1211] [CallId: ${t.id}] Failed to send offer to participant ${p.getFullId()}: ${e instanceof Error ? e.message : JSON.stringify(e)}`,
                              );
                            }
                        } catch (e) {
                          h.error(
                            `[1240] [CallId: ${t.id}] Failed to send offer to participant ${p.getFullId()}: message: ${e instanceof Error ? e.message : JSON.stringify(e)}`,
                            { color: "red" },
                          );
                        }
                      }
                    };
                    S = setInterval(() => {
                      var n, l, r;
                      const o =
                          this.activeCalls.find((e) => e.id === t.id) || t,
                        c =
                          (null == o
                            ? void 0
                            : o.participants.find(
                                (t) => t.getFullId() === e.getFullId(),
                              )) ||
                          (e.id ===
                            (null ===
                              (n = null == o ? void 0 : o.serverParticipant) ||
                            void 0 === n
                              ? void 0
                              : n.id) &&
                            e) ||
                          e;
                      h.info(
                        `[1182] [CallId: ${t.id}] interval time: ${g + 4}`,
                        { color: "green" },
                      );
                      const d =
                        null ===
                          (r =
                            null === (l = this.callParticipantsRTCMap[t.id]) ||
                            void 0 === l
                              ? void 0
                              : l[c.getFullId()]) || void 0 === r
                          ? void 0
                          : r.peerConnection;
                      return o && o.state === s.CallState.Connected
                        ? c.connectionState ===
                            s.ParticipantConnectionState.Connected &&
                          "stable" === (null == d ? void 0 : d.signalingState)
                          ? ((g = 0),
                            void (S && (clearInterval(S), (S = null))))
                          : ((g += 4),
                            a((e) => {
                              var n;
                              return e instanceof u.SceytCallException ||
                                e instanceof Error
                                ? (h.error(
                                    `[1202] [CallId: ${t.id}] SYNC ${i} failed message: ${e.message} code: ${e instanceof u.SceytCallException ? e.code : ""}`,
                                    { color: "red" },
                                  ),
                                  void (
                                    "NotAllowed" === e.name &&
                                    (c.updateConnectionState(
                                      s.ParticipantConnectionState.Disconnected,
                                      t.id,
                                    ),
                                    S && (clearInterval(S), (S = null)))
                                  ))
                                : e.event === s.SignalEvent.ERROR
                                  ? (h.error(
                                      `[1205] [CallId: ${t.id}] SYNC ${i} failed message: ${e.error ? `${e.error.message} code: ${e.error.code}` : ""}`,
                                      { color: "red" },
                                    ),
                                    void (
                                      4002 ===
                                        (null === (n = e.error) || void 0 === n
                                          ? void 0
                                          : n.code) &&
                                      (c.updateConnectionState(
                                        s.ParticipantConnectionState
                                          .Disconnected,
                                        t.id,
                                      ),
                                      S && (clearInterval(S), (S = null)))
                                    ))
                                  : void 0;
                            }),
                            void (
                              (o && o.state === s.CallState.Connected) ||
                              ((g = 0), S && (clearInterval(S), (S = null)))
                            ))
                        : ((g = 0), void (S && (clearInterval(S), (S = null))));
                    }, 4e3);
                    const l = setTimeout(() => {
                      (a((e) => {
                        var i;
                        return e instanceof u.SceytCallException ||
                          e instanceof Error
                          ? (h.error(
                              `[1202] [CallId: ${t.id}] SYNC OFFER failed message: ${e.message} code: ${e instanceof u.SceytCallException ? e.code : ""}`,
                              { color: "red" },
                            ),
                            void (
                              ("NotAllowed" === e.name ||
                                (e instanceof u.SceytCallException &&
                                  4002 === e.code)) &&
                              p.updateConnectionState(
                                s.ParticipantConnectionState.Disconnected,
                                t.id,
                              )
                            ))
                          : e.event === s.SignalEvent.ERROR
                            ? (h.error(
                                `[1205] [CallId: ${t.id}] SYNC OFFER failed message: ${e.error ? `${e.error.message} code: ${e.error.code}` : ""}`,
                                { color: "red" },
                              ),
                              void (
                                4002 ===
                                  (null === (i = e.error) || void 0 === i
                                    ? void 0
                                    : i.code) &&
                                p.updateConnectionState(
                                  s.ParticipantConnectionState.Disconnected,
                                  t.id,
                                )
                              ))
                            : void 0;
                      }),
                        clearTimeout(l));
                    }, 2e3);
                  },
                  f = () => {
                    var i;
                    S ||
                      (p &&
                        d &&
                        (d.mediaFlow === s.MediaFlow.SFU &&
                          e.id ===
                            (null ===
                              (i = null == d ? void 0 : d.serverParticipant) ||
                            void 0 === i
                              ? void 0
                              : i.id) &&
                          this.callParticipantsRTCMap[d.id] &&
                          this.callParticipantsRTCMap[d.id][e.getFullId()] &&
                          d.localParticipant.state ===
                            s.ParticipantState.Joined &&
                          (h.info(
                            `[1258] [CallId: ${t.id}] start renegotiation ${s.MediaFlow.SFU} sendOffer to participant ${p.getFullId()}`,
                            { color: "blue" },
                          ),
                          C("offer", !1)),
                        d.mediaFlow === s.MediaFlow.S2W &&
                          p.state === s.ParticipantState.Joined &&
                          this.callParticipantsRTCMap[d.id] &&
                          this.callParticipantsRTCMap[d.id][p.getFullId()] &&
                          d.localParticipant.state ===
                            s.ParticipantState.Joined &&
                          (h.info(
                            `[1263] [CallId: ${t.id}] start renegotiation ${s.MediaFlow.SFU} sendConnect to participant ${p.getFullId()}`,
                            { color: "blue" },
                          ),
                          C("offer", !1))));
                  };
                switch (c) {
                  case "new":
                    break;
                  case "connecting":
                    (t.mediaFlow === s.MediaFlow.SFU &&
                      p.id ===
                        (null ===
                          (a = null == d ? void 0 : d.serverParticipant) ||
                        void 0 === a
                          ? void 0
                          : a.id) &&
                      d.localParticipant.updateConnectionState(
                        s.ParticipantConnectionState.Connecting,
                        t.id,
                      ) &&
                      d.emitParticipantConnectionStateChanged(
                        d.localParticipant,
                        s.ParticipantConnectionState.Connecting,
                      ),
                      p.updateConnectionState(
                        s.ParticipantConnectionState.Connecting,
                        t.id,
                      ) &&
                        d.emitParticipantConnectionStateChanged(
                          p,
                          s.ParticipantConnectionState.Connecting,
                        ));
                    break;
                  case "connected":
                    if (
                      (t.mediaFlow === s.MediaFlow.SFU &&
                        p.id ===
                          (null ===
                            (l = null == d ? void 0 : d.serverParticipant) ||
                          void 0 === l
                            ? void 0
                            : l.id) &&
                        d.localParticipant.updateConnectionState(
                          s.ParticipantConnectionState.Connected,
                          t.id,
                        ) &&
                        d.emitParticipantConnectionStateChanged(
                          d.localParticipant,
                          s.ParticipantConnectionState.Connected,
                        ),
                      p.updateConnectionState(
                        s.ParticipantConnectionState.Connected,
                        t.id,
                      ) &&
                        d.emitParticipantConnectionStateChanged(
                          p,
                          s.ParticipantConnectionState.Connected,
                        ),
                      p &&
                        d &&
                        "Connected" === this.chatClient.connectionState &&
                        (d.mediaFlow !== s.MediaFlow.SFU ||
                          (d.mediaFlow === s.MediaFlow.SFU &&
                            p.id === (null == d ? void 0 : d.id))))
                    ) {
                      const e = (e) => {
                        e instanceof u.SceytCallException || e instanceof Error
                          ? h.error(
                              `[1098] [CallId: ${d.id}] SYNC MEDIA_CONNECTED signal sent failed message: ${e.message} code: ${e instanceof u.SceytCallException ? e.code : ""}`,
                              { color: "red" },
                            )
                          : e.event === s.SignalEvent.ERROR &&
                            h.error(
                              `[1102] [CallId: ${d.id}] SYNC MEDIA_CONNECTED signal sent failed message: ${e.error ? `${e.error.message} code: ${e.error.code}` : ""}`,
                              { color: "red" },
                            );
                      };
                      this.signalingClient.sendSignalMessage(
                        Object.assign(
                          {
                            mediaFlow: d.mediaFlow,
                            callId: d.id,
                            sessionId: d.sessionId,
                            event: s.SignalEvent.MEDIA_CONNECTED,
                          },
                          d.mediaFlow !== s.MediaFlow.SFU ? { to: d.id } : {},
                        ),
                        e,
                      );
                    }
                    break;
                  case "disconnected":
                    (t.mediaFlow === s.MediaFlow.SFU &&
                      p.id ===
                        (null ===
                          (r = null == d ? void 0 : d.serverParticipant) ||
                        void 0 === r
                          ? void 0
                          : r.id) &&
                      d.localParticipant.updateConnectionState(
                        s.ParticipantConnectionState.Reconnecting,
                        t.id,
                      ) &&
                      d.emitParticipantConnectionStateChanged(
                        d.localParticipant,
                        s.ParticipantConnectionState.Reconnecting,
                      ),
                      p.updateConnectionState(
                        s.ParticipantConnectionState.Reconnecting,
                        t.id,
                      ) &&
                        d.emitParticipantConnectionStateChanged(
                          p,
                          s.ParticipantConnectionState.Reconnecting,
                        ),
                      h.info("[1250] I am here", { color: "blue" }),
                      t.mediaFlow !== s.MediaFlow.S2W && f());
                    break;
                  case "failed":
                    p &&
                      d &&
                      (d.mediaFlow === s.MediaFlow.P2P &&
                      p.state === s.ParticipantState.Joined &&
                      this.callParticipantsRTCMap[d.id] &&
                      this.callParticipantsRTCMap[d.id][p.getFullId()] &&
                      d.localParticipant.state === s.ParticipantState.Joined
                        ? (h.info(
                            `[1268] [CallId: ${t.id}] start renegotiation ${d.mediaFlow} sendOffer to participant ${p.getFullId()}`,
                            { color: "blue" },
                          ),
                          C("offer", !0))
                        : f());
                    break;
                  case "closed":
                    (t.mediaFlow === s.MediaFlow.SFU &&
                      p.id ===
                        (null ===
                          (o = null == d ? void 0 : d.serverParticipant) ||
                        void 0 === o
                          ? void 0
                          : o.id) &&
                      d.localParticipant.updateConnectionState(
                        s.ParticipantConnectionState.Idle,
                        t.id,
                      ) &&
                      d.emitParticipantConnectionStateChanged(
                        d.localParticipant,
                        s.ParticipantConnectionState.Idle,
                      ),
                      p.updateConnectionState(
                        s.ParticipantConnectionState.Idle,
                        t.id,
                      ) &&
                        d.emitParticipantConnectionStateChanged(
                          p,
                          s.ParticipantConnectionState.Idle,
                        ));
                }
              };
            }
            onIceCandidateErrorListener(e, t) {
              return (i) => {
                h.error(
                  `[1284] [CallId: ${t.id}] ICE candidate error participantID: ${e.getFullId()}, error - code: ${i.errorCode}, message: ${i.errorText}, url: ${i.url}`,
                  { color: "red" },
                );
              };
            }
            onTrackListener(e, t) {
              return (i) => {
                this.onTrack(e, t, i);
              };
            }
            closePeerConnections(e, t) {
              if (!this.callParticipantsRTCMap[e]) return;
              const i = this.callParticipantsRTCMap[e][t];
              i
                ? (i.listeners
                    ? (Object.keys(i.listeners).forEach((e) => {
                        i.removeEventListener(e, i.listeners[e]);
                      }),
                      h.info(
                        `[1313] [CallId: ${e}] Removed all listeners for WebRTCClient of participant ${t}`,
                        { color: "cyan" },
                      ))
                    : h.info(
                        `[1316] [CallId: ${e}] No listeners found for WebRTCClient of participant ${t}`,
                        { color: "cyan" },
                      ),
                  i.close(),
                  (i.peerConnection.onicecandidate = null),
                  (i.peerConnection.ontrack = null),
                  (i.peerConnection.onconnectionstatechange = null),
                  (i.peerConnection.oniceconnectionstatechange = null),
                  (i.peerConnection.onsignalingstatechange = null),
                  (this.callParticipantsRTCMap[e][t] = null),
                  delete this.callParticipantsRTCMap[e][t])
                : h.info(
                    `[1375] [CallId: ${e}] No WebRTCClient found for participant ${t}`,
                    { color: "cyan" },
                  );
            }
            addParticipantToRTCMap(e, t) {
              this.callParticipantsRTCMap.hasOwnProperty(e.id) ||
                (this.callParticipantsRTCMap[e.id] = {});
              const i = new l.WebRTCClient(e.id, this.rtcConfig);
              this.callParticipantsRTCMap[e.id][t.getFullId()] = i;
              const n = this.onIceCandidateListener(t, e),
                a = this.onSignalingStateChangeListener(t, e),
                r = this.onIceConnectionStateChangeListener(t, e),
                s = this.onConnectionStateChangeListener(t, e),
                o = this.onTrackListener(e, t),
                c = this.onIceCandidateErrorListener(t, e);
              return (
                i.addEventListener("icecandidate", n),
                i.addEventListener("signalingstatechange", a),
                i.addEventListener("connectionstatechange", s),
                i.addEventListener("track", o),
                i.addEventListener("icecandidateerror", c),
                i.addEventListener("iceconnectionstatechange", r),
                i.setListeners({
                  iceCandidateListener: n,
                  signalingStateChangeListener: a,
                  connectionStateChangeListener: s,
                  trackListener: o,
                  iceCandidateErrorListener: c,
                  iceConnectionStateChangeListener: r,
                }),
                h.info(
                  `[1371] [CallId: ${e.id}] Added Event Listeners to RTC Map: participantID: ${t.getFullId()}`,
                  { color: "blue" },
                ),
                e.activeSpeakerManager.addParticipant(t),
                t
              );
            }
            joinToCall(e, t) {
              return this.signalingClient.sendSignalMessage(
                Object.assign(
                  Object.assign(
                    Object.assign(
                      { mediaFlow: e.mediaFlow, callId: e.callId },
                      e.sessionId && { sessionId: e.sessionId },
                    ),
                    { event: s.SignalEvent.JOIN, participants: e.participants },
                  ),
                  (null == e ? void 0 : e.metadata) && { metadata: e.metadata },
                ),
                t,
              );
            }
            sendRinging(e) {
              return this.signalingClient.sendSignalMessage(
                {
                  mediaFlow: e.mediaFlow,
                  callId: e.id,
                  sessionId: e.sessionId,
                  event: s.SignalEvent.RINGING,
                },
                (t) => {
                  t instanceof u.SceytCallException || t instanceof Error
                    ? h.error(
                        `[1389] [CallId: ${e.id}] SYNC RINGING failed message: ${t.message} code: ${t instanceof u.SceytCallException ? t.code : ""}`,
                        { color: "red" },
                      )
                    : t.event !== s.SignalEvent.ERROR
                      ? (e.localParticipant.updateState(
                          s.ParticipantState.Ringing,
                          e.id,
                        ),
                        e.emitParticipantStateChanged(
                          e.localParticipant,
                          s.ParticipantState.Ringing,
                        ))
                      : h.error(
                          `[1393] [CallId: ${e.id}] SYNC RINGING failed message: ${t.error ? `${t.error.message} code: ${t.error.code}` : ""}`,
                          { color: "red" },
                        );
                },
              );
            }
            rejectCall(e, t) {
              const i = this.activeCalls.find((t) => t.id === e.id);
              return (
                i &&
                  (i.setState(s.CallState.Idle, "rejectCall"),
                  i.localParticipant.updateState(
                    s.ParticipantState.Declined,
                    e.id,
                  ) &&
                    i.emitParticipantStateChanged(
                      i.localParticipant,
                      s.ParticipantState.Declined,
                    ),
                  i.localParticipant.updateConnectionState(
                    s.ParticipantConnectionState.Idle,
                    e.id,
                  ) &&
                    i.emitParticipantConnectionStateChanged(
                      i.localParticipant,
                      s.ParticipantConnectionState.Idle,
                    ),
                  this.closeTracksAndPeerConnections(i)),
                this.signalingClient.sendSignalMessage(
                  {
                    mediaFlow: e.mediaFlow,
                    callId: e.id,
                    sessionId: e.sessionId,
                    event: s.SignalEvent.DECLINE,
                    metadata: Object.assign(Object.assign({}, e.metadata), {
                      reason: t || "",
                    }),
                  },
                  (t) => {
                    t instanceof u.SceytCallException || t instanceof Error
                      ? h.error(
                          `[1420] [CallId: ${e.id}] SYNC DECLINE failed message: ${t.message} code: ${t instanceof u.SceytCallException ? t.code : ""}`,
                          { color: "red" },
                        )
                      : t.event === s.SignalEvent.ERROR &&
                        h.error(
                          `[1424] [CallId: ${e.id}] SYNC DECLINE failed message: ${t.error ? `${t.error.message} code: ${t.error.code}` : ""}`,
                          { color: "red" },
                        );
                  },
                )
              );
            }
            closeTracksAndPeerConnections(e) {
              (e.localAudioTracks.forEach((e) => {
                e.stop();
              }),
                e.localVideoTracks.forEach((e) => {
                  e.stop();
                }),
                e.participants.forEach((t) => {
                  (t.videoTracks.forEach((e) => {
                    e.stop();
                  }),
                    t.audioTracks.forEach((e) => {
                      e.stop();
                    }),
                    this.closePeerConnections(e.id, t.getFullId()),
                    e.activeSpeakerManager.removeParticipant(t));
                }),
                e.localParticipant.videoTracks.forEach((e) => {
                  e.stop();
                }),
                e.localParticipant.audioTracks.forEach((e) => {
                  e.stop();
                }),
                e.mediaFlow === s.MediaFlow.SFU &&
                  e.serverParticipant &&
                  (e.serverParticipant.videoTracks.forEach((e) => {
                    e.stop();
                  }),
                  e.serverParticipant.audioTracks.forEach((e) => {
                    e.stop();
                  }),
                  this.closePeerConnections(
                    e.id,
                    e.serverParticipant.getFullId(),
                  )));
            }
            closeCall(e) {
              (e.setState(s.CallState.Closed, "closeCall"),
                this.closeTracksAndPeerConnections(e));
              const t = this.activeCalls.findIndex((t) => t.id === e.id);
              (this.activeCalls.splice(t, 1),
                this.callEvents.onOngoingCallsUpdated &&
                  this.callEvents.onOngoingCallsUpdated(this.activeCalls),
                delete this.callParticipantsRTCMap[e.id],
                h.info(
                  `[1474] [CallId: ${e.id}] closed call and removed from active calls: callId: ${e.id}`,
                  { color: "light-green" },
                ));
            }
            leaveCall(e, t = !0, i) {
              const n = this.activeCalls.find((t) => t.id === e.id);
              if (n) {
                this.signalingClient.cancelJoinIfPossible(e.id);
                const a = n.setState(s.CallState.Idle, `leaveCall: ${i}`);
                if (t && a) {
                  const t = (t) => {
                    t instanceof u.SceytCallException || t instanceof Error
                      ? h.error(
                          `[1487] [CallId: ${e.id}] SYNC LEAVE failed message: ${t.message} code: ${t instanceof u.SceytCallException ? t.code : ""}`,
                          { color: "red" },
                        )
                      : t.event === s.SignalEvent.ERROR &&
                        h.error(
                          `[1491] [CallId: ${e.id}] SYNC LEAVE failed message: ${t.error ? `${t.error.message} code: ${t.error.code}` : ""}`,
                          { color: "red" },
                        );
                  };
                  this.signalingClient.sendSignalMessage(
                    {
                      mediaFlow: e.mediaFlow,
                      callId: e.id,
                      sessionId: e.sessionId,
                      event: s.SignalEvent.LEAVE,
                    },
                    t,
                  );
                }
                (this.closeTracksAndPeerConnections(n),
                  delete this.callParticipantsRTCMap[n.id],
                  n.localParticipant.updateState(
                    s.ParticipantState.Left,
                    e.id,
                  ) &&
                    n.emitParticipantStateChanged(
                      n.localParticipant,
                      s.ParticipantState.Left,
                    ),
                  n.localParticipant.setVideoEnabled(!1),
                  n.localParticipant.setScreenSharing(!1),
                  n.localParticipant.setMuted(!1),
                  n.localParticipant.connectionState !==
                    s.ParticipantConnectionState.Idle &&
                    n.localParticipant.updateConnectionState(
                      s.ParticipantConnectionState.Idle,
                      e.id,
                    ),
                  n.participants.forEach((t) => {
                    t.connectionState !== s.ParticipantConnectionState.Idle &&
                      (t.updateConnectionState(
                        s.ParticipantConnectionState.Idle,
                        e.id,
                      ),
                      n.emitParticipantConnectionStateChanged(
                        t,
                        s.ParticipantConnectionState.Idle,
                      ));
                  }),
                  e.sessionId ||
                    (this.activeCalls = this.activeCalls.filter(
                      (e) => e.id != n.id,
                    )),
                  this.callEvents.onOngoingCallsUpdated &&
                    this.callEvents.onOngoingCallsUpdated(this.activeCalls));
              }
            }
            setRemoteDescription(e, t, i) {
              return this.callParticipantsRTCMap[e][t].setRemoteDescription(i);
            }
            changeVideoTracks(e, t, i) {
              var n;
              (h.info(
                `[1594] [CallId: ${e.id}], mediaFlow: ${e.mediaFlow}, changeVideoTracks ${i}, serverParticipant: ${(null === (n = e.serverParticipant) || void 0 === n ? void 0 : n.id) || "null"}`,
                { color: "cyan" },
              ),
                e.mediaFlow !== s.MediaFlow.SFU
                  ? e.participants.forEach((n) => {
                      (n.id !== this.user.id || n.clientId !== this.clientId) &&
                        n.clientId &&
                        this.callParticipantsRTCMap[e.id] &&
                        this.callParticipantsRTCMap[e.id][n.getFullId()] &&
                        this.callParticipantsRTCMap[e.id][
                          n.getFullId()
                        ].enableVideoOnPeerConnection(i, t);
                    })
                  : this.callParticipantsRTCMap[e.id] &&
                    this.callParticipantsRTCMap[e.id][e.id] &&
                    this.callParticipantsRTCMap[e.id][
                      e.id
                    ].enableVideoOnPeerConnection(i, t));
            }
            changeAudioTracks(e, t, i) {
              e.mediaFlow !== s.MediaFlow.SFU
                ? e.participants.forEach((n) => {
                    (n.id !== this.user.id || n.clientId !== this.clientId) &&
                      this.callParticipantsRTCMap[e.id] &&
                      this.callParticipantsRTCMap[e.id][n.getFullId()] &&
                      (h.info(
                        `[1561] [CallId: ${e.id}] Enabling audio on peer connection: ${n.getFullId()}`,
                        { color: "cyan" },
                      ),
                      this.callParticipantsRTCMap[e.id][
                        n.getFullId()
                      ].enableAudioOnPeerConnection(i, t));
                  })
                : (h.info(
                    `[1565] [CallId: ${e.id}] Enabling audio on peer connection: ${e.id}`,
                    { color: "cyan" },
                  ),
                  this.callParticipantsRTCMap[e.id][
                    e.id
                  ].enableAudioOnPeerConnection(i, t));
            }
            sendVideoEnabled(e, t) {
              if (this.activeCalls.find((t) => t.id === e.id))
                try {
                  const i = (t) => {
                    t instanceof u.SceytCallException || t instanceof Error
                      ? h.error(
                          `[1632] [CallId: ${e.id}] SYNC VIDEO_ON failed message: ${t.message} code: ${t instanceof u.SceytCallException ? t.code : ""}`,
                        )
                      : t.event === s.SignalEvent.ERROR &&
                        h.error(
                          `[1636] [CallId: ${e.id}] SYNC VIDEO_ON failed message: ${t.error ? `${t.error.message} code: ${t.error.code}` : ""}`,
                        );
                  };
                  this.signalingClient.sendSignalMessage(
                    {
                      mediaFlow: e.mediaFlow,
                      callId: e.id,
                      event: t
                        ? s.SignalEvent.VIDEO_ON
                        : s.SignalEvent.VIDEO_OFF,
                      sessionId: e.sessionId,
                    },
                    i,
                  );
                } catch (t) {
                  h.error(
                    `[1645] [CallId: ${e.id}] Failed to send video enabled signal: message: ${t instanceof Error ? t.message : JSON.stringify(t)}`,
                    { color: "red" },
                  );
                }
            }
            sendScreenShare(e, t, i) {
              if (this.activeCalls.find((t) => t.id === e.id))
                return (
                  e.mediaFlow !== s.MediaFlow.SFU
                    ? e.participants.forEach((n) => {
                        (n.id === this.user.id &&
                          n.clientId === this.clientId) ||
                          !n.clientId ||
                          (this.callParticipantsRTCMap[e.id] &&
                            this.callParticipantsRTCMap[e.id][n.getFullId()] &&
                            this.callParticipantsRTCMap[e.id][
                              n.getFullId()
                            ].enableVideoOnPeerConnection(t, i, !0));
                      })
                    : this.callParticipantsRTCMap[e.id] &&
                      this.callParticipantsRTCMap[e.id][
                        e.serverParticipant.id
                      ] &&
                      this.callParticipantsRTCMap[e.id][
                        e.serverParticipant.id +
                          (e.serverParticipant.clientId
                            ? "/" + e.serverParticipant.clientId
                            : "")
                      ].enableVideoOnPeerConnection(t, i, !0),
                  this.sendSignalScreenShare(e, t)
                );
            }
            sendAudioEnable(e, t) {
              if (this.activeCalls.find((t) => t.id === e.id)) {
                const i = (i) => {
                  i instanceof u.SceytCallException || i instanceof Error
                    ? h.error(
                        `[1704] [CallId: ${e.id}] SYNC HOLD failed message: ${i.message} code: ${i instanceof u.SceytCallException ? i.code : ""}`,
                      )
                    : (i.event === s.SignalEvent.ERROR &&
                        h.error(
                          `[1708] [CallId: ${e.id}] SYNC HOLD failed message: ${i.error ? `${i.error.message} code: ${i.error.code}` : ""}`,
                        ),
                      e.mediaFlow !== s.MediaFlow.SFU
                        ? e.participants.forEach((i) => {
                            (i.id !== this.user.id ||
                              i.clientId !== this.clientId) &&
                              i.clientId &&
                              this.callParticipantsRTCMap[e.id] &&
                              this.callParticipantsRTCMap[e.id][
                                i.getFullId()
                              ] &&
                              (h.info(
                                `[1712] [CallId: ${e.id}] Enabling audio on peer connection: ${i.getFullId()}`,
                                { color: "cyan" },
                              ),
                              this.callParticipantsRTCMap[e.id][
                                i.getFullId()
                              ].enableAudioOnPeerConnection(t));
                          })
                        : this.callParticipantsRTCMap &&
                          this.callParticipantsRTCMap[e.id] &&
                          this.callParticipantsRTCMap[e.id][
                            e.serverParticipant.id
                          ] &&
                          (h.info(
                            `[1712] [CallId: ${e.id}] Enabling audio on peer connection: ${e.serverParticipant.id}`,
                            { color: "cyan" },
                          ),
                          this.callParticipantsRTCMap[e.id][
                            e.serverParticipant.id
                          ].enableAudioOnPeerConnection(t)),
                      e.localParticipant.audioTracks.forEach((e) => {
                        e.enabled = !t;
                      }));
                };
                return this.signalingClient.sendSignalMessage(
                  {
                    mediaFlow: e.mediaFlow,
                    callId: e.id,
                    event: t ? s.SignalEvent.MUTE : s.SignalEvent.UNMUTE,
                    sessionId: e.sessionId,
                  },
                  i,
                );
              }
            }
            sendHold(e, t) {
              const i = this.activeCalls.find((t) => t.id === e.id);
              if (i) {
                this.sendAudioEnable(i, !t);
                const n = (t) => {
                  t instanceof u.SceytCallException || t instanceof Error
                    ? h.error(
                        `[1741] [CallId: ${e.id}] SYNC HOLD failed message: ${t.message} code: ${t instanceof u.SceytCallException ? t.code : ""}`,
                      )
                    : t.event === s.SignalEvent.ERROR &&
                      h.error(
                        `[1745] [CallId: ${e.id}] SYNC HOLD failed message: ${t.error ? `${t.error.message} code: ${t.error.code}` : ""}`,
                      );
                };
                return this.signalingClient.sendSignalMessage(
                  {
                    mediaFlow: e.mediaFlow,
                    callId: e.id,
                    event: t ? s.SignalEvent.HOLD : s.SignalEvent.UNHOLD,
                    sessionId: e.sessionId,
                  },
                  n,
                );
              }
            }
            addTracksToPeerConnection(e, t, i = !0) {
              return n(this, void 0, void 0, function* () {
                let n = e.localVideoTracks;
                const a = e.localAudioTracks,
                  l = new MediaStream();
                a && a.length > 0 && l.addTrack(a[0]);
                try {
                  i
                    ? yield this.callParticipantsRTCMap[e.id][
                        t
                      ].addTransceiverToPeerConnection(a[0], e.mediaFlow)
                    : yield this.callParticipantsRTCMap[e.id][
                        t
                      ].setStreamsToTransceiver(a[0]);
                } catch (t) {
                  h.warn(
                    `[1766] [CallId: ${e.id}] Failed to add track to peer connection: message: ${t instanceof Error ? t.message : JSON.stringify(t)}`,
                    { color: "red" },
                  );
                }
                ((n && n.length > 0) || (n = (0, c.getEmptyVideoTrack)()),
                  l.addTrack(n[0]));
                try {
                  i
                    ? yield this.callParticipantsRTCMap[e.id][
                        t
                      ].addTransceiverToPeerConnection(n[0], e.mediaFlow)
                    : yield this.callParticipantsRTCMap[e.id][
                        t
                      ].setStreamsToTransceiver(n[0]);
                } catch (t) {
                  h.warn(
                    `[1775] [CallId: ${e.id}] Failed to add track to peer connection: message: ${t instanceof Error ? t.message : JSON.stringify(t)}`,
                    { color: "red" },
                  );
                }
              });
            }
            switchCallToSfu(e) {
              try {
                const t = (t) => {
                  if (t instanceof u.SceytCallException || t instanceof Error)
                    return void h.error(
                      `[1785] [CallId: ${e.id}] SYNC SWITCH_MEDIA_FLOW signal sent failed message: ${t.message} code: ${t instanceof u.SceytCallException ? t.code : ""}`,
                    );
                  t.event === s.SignalEvent.ERROR &&
                    h.error(
                      `[1789] [CallId: ${e.id}] SYNC SWITCH_MEDIA_FLOW signal sent failed message: ${t.error ? `${t.error.message} code: ${t.error.code}` : ""}`,
                    );
                  const i = new a.Participant(e.id);
                  return (
                    e.setServerParticipant(i),
                    e.participants.forEach((t) => {
                      ((t.id === this.user.id &&
                        t.clientId === this.clientId) ||
                        t.updateConnectionState(
                          s.ParticipantConnectionState.Idle,
                          e.id,
                        ),
                        t.setShouldResetPeerConnection(!0));
                    }),
                    e.changeMediaFlow(s.MediaFlow.SFU),
                    h.info(
                      `[1818] [CallId: ${e.id}] Sending offer to server participant: ${i.getFullId()}`,
                    ),
                    this.sendOfferPeerToPeer(e, i, (t) => {
                      t instanceof u.SceytCallException || t instanceof Error
                        ? h.error(
                            `[1805] [CallId: ${e.id}] SYNC OFFER signal sent failed message: ${t.message} code: ${t instanceof u.SceytCallException ? t.code : ""}`,
                          )
                        : t.event !== s.SignalEvent.ERROR ||
                          h.error(
                            `[1809] [CallId: ${e.id}] SYNC OFFER signal sent failed message: ${t.error ? `${t.error.message} code: ${t.error.code}` : ""}`,
                          );
                    }),
                    !0
                  );
                };
                (this.signalingClient.sendSignalMessage(
                  {
                    mediaFlow: s.MediaFlow.SFU,
                    callId: e.id,
                    event: s.SignalEvent.SWITCH_MEDIA_FLOW,
                    sessionId: e.sessionId,
                  },
                  t,
                ),
                  h.info(
                    `[1823] [CallId: ${e.id}] Switched call ${e.id} to SFU`,
                    { color: "light-green" },
                  ));
              } catch (t) {
                h.error(
                  `[1827] [CallId: ${e.id}] Failed to switch ${s.MediaFlow.SFU} message: ${t instanceof Error ? t.message : JSON.stringify(t)}`,
                );
              }
            }
            getCallById(e, t) {
              return this.signalingClient.sendSignalMessage(
                { callId: e, sessionId: t, event: s.SignalEvent.GET_CALL },
                (t) => {
                  t instanceof u.SceytCallException || t instanceof Error
                    ? h.error(
                        `[1833] [CallId: ${e}] SYNC GET_CALL signal sent failed message: ${t.message} code: ${t instanceof u.SceytCallException ? t.code : ""}`,
                      )
                    : t.event === s.SignalEvent.ERROR &&
                      h.error(
                        `[1837] [CallId: ${e}] SYNC GET_CALL signal sent failed message: ${t.error ? `${t.error.message} code: ${t.error.code}` : ""}`,
                      );
                },
                e,
              );
            }
            getCalls() {
              return this.signalingClient.sendSignalMessage(
                { callId: "", event: s.SignalEvent.GET_CALL },
                (e) => {
                  e instanceof u.SceytCallException || e instanceof Error
                    ? h.error(
                        `[1849] [CallId: GLOBAL_LOGS] SYNC GET_CALL signal sent failed message: ${e.message} code: ${e instanceof u.SceytCallException ? e.code : ""}`,
                      )
                    : (e.event === s.SignalEvent.ERROR &&
                        h.error(
                          "[1853] [CallId: GLOBAL_LOGS] SYNC GET_CALL signal sent failed message: " +
                            (e.error
                              ? `${e.error.message} code: ${e.error.code}`
                              : ""),
                        ),
                      this.syncActiveCalls(e));
                },
                "get_call",
              );
            }
            findOrCreateCall(e, t) {
              let i = this.activeCalls.find((t) => t.id === e.id),
                n = !1,
                l = !1;
              if (i) {
                if (
                  (h.info(`[1911] [CallId: ${i.id}] Using existing call`, {
                    color: "cyan",
                  }),
                  (n = !0),
                  !i.participants.find(
                    (e) =>
                      e.id === this.user.id && e.clientId === this.clientId,
                  ) &&
                    i.localParticipant.id === this.user.id &&
                    i.localParticipant.clientId === this.clientId)
                ) {
                  const e = (0, c.makeFirstById)(
                    [...i.participants, i.localParticipant],
                    this.user.id,
                    this.clientId,
                  );
                  ((i.participants = e),
                    i.emitParticipantsAdded(
                      [i.localParticipant],
                      s.ParticipantEntryType.ADDED,
                    ));
                }
              } else {
                let r = new a.Participant(this.user.id, this.clientId);
                const d = e.id || (0, p.v4)();
                h.info(`[1869] [CallId: ${d}] Creating new call`, {
                  color: "cyan",
                });
                const u = (t || e.participantIds).map((e) => {
                    let i = new a.Participant(
                      t ? e.id : e,
                      t ? e.clientId : void 0,
                    );
                    return (
                      t &&
                        (i.setVideoEnabled(e.videoEnabled),
                        i.setMuted(e.muted),
                        (i.state = e.state),
                        e.connectionState >
                          s.ParticipantConnectionState.Connected &&
                          e.id !== this.user.id &&
                          e.clientId !== this.clientId &&
                          (i.connectionState = e.connectionState),
                        this.user.id !== e.id ||
                          (e.clientId !== this.clientId && e.clientId) ||
                          ((l = (null == e ? void 0 : e.isCallSilenced) || !1),
                          (r = i))),
                      i
                    );
                  }),
                  g = (0, c.makeFirstById)(
                    [...u, r],
                    this.user.id,
                    this.clientId,
                  );
                ((i = new o.Call({
                  id: d,
                  sessionId: e.sessionId,
                  mediaFlow: e.mediaFlow,
                  localParticipant: r,
                  participants: g,
                  metadata: e.metadata,
                  createdBy: e.createdBy,
                  chatClient: this.chatClient,
                  isCallSilenced: l,
                })),
                  this.activeCalls.push(i),
                  this.callEvents.onOngoingCallsUpdated &&
                    this.callEvents.onOngoingCallsUpdated(this.activeCalls),
                  (n = !1));
              }
              return { call: i, answer: n };
            }
            processJoinAcknowledgment(e, t, i) {
              var n, a, l, r;
              if (t.event === s.SignalEvent.ERROR)
                throw (
                  h.error(
                    `[1955] [CallId: ${e.id}] Join failed: message: ${null === (n = t.error) || void 0 === n ? void 0 : n.message} code: ${null === (a = t.error) || void 0 === a ? void 0 : a.code}`,
                  ),
                  this.leaveCall(e, !0, "processJoinAcknowledgment"),
                  {
                    code:
                      null === (l = t.error) || void 0 === l ? void 0 : l.code,
                    message:
                      null === (r = t.error) || void 0 === r
                        ? void 0
                        : r.message,
                  }
                );
              if (t.event === s.SignalEvent.SUCCESS)
                return (
                  e.eventsQueue.forEach((e) => {
                    e();
                  }),
                  e.eventsQueue.clear(),
                  this.configureRTCServers(e, t, i),
                  e
                );
              throw (
                h.warn(
                  `[1969] [CallId: ${e.id}] Unexpected join event: ${t.event}`,
                ),
                new Error(`Unexpected event type: ${t.event}`)
              );
            }
            configureRTCServers(e, t, i) {
              var n;
              ((null === (n = t.turnServers) || void 0 === n
                ? void 0
                : n.length) &&
                this.setRTCConfig(
                  Object.assign(
                    Object.assign(
                      {},
                      e.mediaFlow === s.MediaFlow.SFU
                        ? {}
                        : {
                            iceServers: t.turnServers.map((e) => ({
                              urls: [
                                `${e.url}?transport=tcp`,
                                `${e.url}?transport=udp`,
                              ],
                              credential: e.password,
                              username: e.username,
                            })),
                          },
                    ),
                    { bundlePolicy: "max-bundle", rtcpMuxPolicy: "require" },
                  ),
                ),
                this.processRemoteParticipants(e, t.participants),
                e.mediaFlow === s.MediaFlow.SFU
                  ? this.setupSFUConnection(e, i, t)
                  : e.participants.forEach((t) => {
                      e.mediaFlow === s.MediaFlow.P2P &&
                        t.getFullId() != e.localParticipant.getFullId() &&
                        t.state === s.ParticipantState.Joined &&
                        this.isPolitePeer(
                          t.getFullId(),
                          e.localParticipant.getFullId(),
                        ) &&
                        (h.info(
                          `[2008] [CallId: ${e.id}] Sending offer to participant: ${t.getFullId()}`,
                        ),
                        this.sendOfferPeerToPeer(e, t, (t) => {
                          t instanceof u.SceytCallException ||
                          t instanceof Error
                            ? h.error(
                                `[2005] [CallId: ${e.id}] SYNC OFFER failed message: ${t.message} code: ${t instanceof u.SceytCallException ? t.code : ""}`,
                              )
                            : t.event === s.SignalEvent.ERROR &&
                              h.error(
                                `[2010] [CallId: ${e.id}] SYNC OFFER failed message: ${t.error ? `${t.error.message} code: ${t.error.code}` : ""}`,
                              );
                        }));
                    }));
            }
            setupSFUConnection(e, t, i) {
              const n = new a.Participant(e.id);
              h.info(
                `[2005] [CallId: ${e.id}] [serverParticipant.id:${n.getFullId()}] Adding server participant to RTC map`,
                { color: "cyan" },
              );
              try {
                e.setServerParticipant(n);
                const a = (n) => {
                  n instanceof u.SceytCallException || n instanceof Error
                    ? h.error(
                        `[2011] [CallId: ${e.id}] SYNC OFFER failed message: ${n.message} code: ${n instanceof u.SceytCallException ? n.code : ""}`,
                      )
                    : (n.event === s.SignalEvent.ERROR &&
                        h.error(
                          `[2015] [CallId: ${e.id}] SYNC OFFER failed message: ${n.error ? `${n.error.message} code: ${n.error.code}` : ""}`,
                        ),
                      n.event !== s.SignalEvent.ERROR &&
                        (h.info(
                          `[2019] [CallId: ${e.id}] offerAck: ${JSON.stringify(n)}`,
                          { color: "cyan" },
                        ),
                        e.participants.forEach((n) => {
                          if (
                            (n.id === this.user.id &&
                              n.clientId === this.clientId) ||
                            !i.participants.find(
                              (e) =>
                                e.id === n.id &&
                                e.clientId === n.clientId &&
                                e.connectionState ===
                                  s.MediaConnectionState.Connected,
                            )
                          )
                            n.connectionState &&
                              n.connectionState >
                                s.ParticipantConnectionState.Connected &&
                              n.id !== this.user.id &&
                              n.clientId !== this.clientId &&
                              n.getFullId() != e.localParticipant.getFullId() &&
                              (n.updateConnectionState(n.connectionState, e.id),
                              e.emitParticipantConnectionStateChanged(
                                n,
                                n.connectionState,
                              ));
                          else {
                            const a = (t) => {
                              t instanceof u.SceytCallException ||
                              t instanceof Error
                                ? h.error(
                                    `[2023] [CallId: ${e.id}] SYNC CONNECT failed message: ${t.message} code: ${t instanceof u.SceytCallException ? t.code : ""}`,
                                  )
                                : t.event === s.SignalEvent.ERROR &&
                                  h.error(
                                    `[2028] [CallId: ${e.id}] SYNC CONNECT failed message: ${t.error ? `${t.error.message} code: ${t.error.code}` : ""}`,
                                  );
                            };
                            (this.signalingClient.clearParticipantSignals(
                              e.id,
                              n.getFullId(),
                            ),
                              this.signalingClient.sendSignalMessage(
                                {
                                  mediaFlow: t,
                                  callId: e.id,
                                  event: s.SignalEvent.CONNECT,
                                  sessionId: i.sessionId,
                                  to: n.getFullId(),
                                  metadata: e.metadata,
                                },
                                a,
                              ));
                          }
                        })));
                };
                (h.info(
                  `[2067] [CallId: ${e.id}] Sending offer to server participant: ${n.getFullId()}`,
                ),
                  this.sendOfferPeerToPeer(e, n, a));
              } catch (t) {
                throw (
                  h.error(
                    `[2049] [CallId: ${e.id}] SFU setup error: message: ${t instanceof Error ? t.message : JSON.stringify(t)}`,
                  ),
                  t
                );
              }
            }
            processRemoteParticipants(e, t) {
              t.length &&
                (t.forEach((t) => {
                  let i = e.participants.find(
                    (e) => e.getFullId() === this.getParticipantId(t),
                  );
                  if (
                    (i ||
                      ((i = e.participants.find(
                        (e) =>
                          e.id === t.id &&
                          (e.clientId === t.clientId || !e.clientId),
                      )),
                      i && !i.clientId && (i.clientId = t.clientId)),
                    i ||
                      e.localParticipant.getFullId() ===
                        this.getParticipantId(t))
                  )
                    i &&
                      e.localParticipant.getFullId() !==
                        this.getParticipantId(t) &&
                      ((i.presenter = t.presenter),
                      i.setVideoEnabled(
                        !!t.hasOwnProperty("videoEnabled") && t.videoEnabled,
                      ),
                      e.emitParticipantEvent(
                        i,
                        t.hasOwnProperty("videoEnabled")
                          ? "VideoEnabled"
                          : "VideoDisabled",
                      ),
                      i.setMuted(!!t.hasOwnProperty("muted") && t.muted),
                      e.emitParticipantEvent(
                        i,
                        t.hasOwnProperty("muted") ? "Mute" : "Unmute",
                      ),
                      i.setHold(!!t.hasOwnProperty("onHold") && t.onHold),
                      e.emitParticipantEvent(
                        i,
                        t.hasOwnProperty("onHold") ? "Hold" : "Unhold",
                      ),
                      i.setScreenSharing(
                        !!t.hasOwnProperty("screenSharing") && t.screenSharing,
                      ),
                      e.emitParticipantEvent(
                        i,
                        t.hasOwnProperty("screenSharing")
                          ? "ScreenSharingStarted"
                          : "ScreenSharingStopped",
                      ),
                      i.state != t.state &&
                        void 0 !== t.state &&
                        (i.updateState(
                          t.state || s.ParticipantState.Idle,
                          e.id,
                        ),
                        e.emitParticipantStateChanged(i, t.state, "FromJoin")));
                  else {
                    const i = new a.Participant(t.id, t.clientId);
                    (i.updateState(t.state, e.id),
                      i.setVideoEnabled(
                        !!t.hasOwnProperty("videoEnabled") && t.videoEnabled,
                      ),
                      i.setMuted(!!t.hasOwnProperty("muted") && t.muted),
                      i.setHold(!!t.hasOwnProperty("onHold") && t.onHold),
                      i.setScreenSharing(
                        !!t.hasOwnProperty("screenSharing") && t.screenSharing,
                      ),
                      e.addParticipantToList(i),
                      e.emitParticipantsAdded(
                        [i],
                        s.ParticipantEntryType.ADDED,
                      ));
                  }
                }),
                h.info(
                  `[2098] [CallId: ${e.id}] Processed participants - Added and Updated`,
                  { color: "cyan" },
                ));
            }
            processJoinCall(e, t, i) {
              e.mediaFlow !== s.MediaFlow.SFU &&
                e.localParticipant.updateConnectionState(
                  s.ParticipantConnectionState.Connected,
                  e.id,
                );
              const n = t.mediaFlow || s.MediaFlow.P2P;
              (e.setSessionId(t.sessionId),
                e.changeMediaFlow(n),
                e.localParticipant.updateState(s.ParticipantState.Joined, e.id),
                e.setState(s.CallState.Connected, i)
                  ? (e.emitParticipantStateChanged(
                      e.localParticipant,
                      s.ParticipantState.Joined,
                    ),
                    e.emitParticipantConnectionStateChanged(
                      e.localParticipant,
                      s.ParticipantConnectionState.Connected,
                    ),
                    this.processJoinAcknowledgment(e, t, n))
                  : this.leaveCall(e, !0, "processJoinCall"));
            }
            startCall(e, t, i) {
              const a = t.mediaFlow,
                l = e.participants
                  .filter(
                    (e) =>
                      !(e.id === this.user.id && e.clientId === this.clientId),
                  )
                  .map((e) => e.serialize());
              return (
                e.mediaFlow !== s.MediaFlow.SFU &&
                  e.localParticipant.updateConnectionState(
                    s.ParticipantConnectionState.Connecting,
                    e.id,
                  ),
                this.setupMediaStream(e).then(({ audioTracks: t }) => {
                  e.state != s.CallState.Idle
                    ? (e.emitAudioTrackAdded(e.localParticipant, t[0]),
                      this.joinToCall(
                        {
                          mediaFlow: a,
                          callId: e.id,
                          sessionId: e.sessionId,
                          participants: i ? [] : l,
                          metadata: e.metadata,
                        },
                        (t) =>
                          n(this, void 0, void 0, function* () {
                            t instanceof u.SceytCallException ||
                            t instanceof Error
                              ? h.error(
                                  `[2137] [CallId: ${e.id}] SYNC JOIN failed message: ${t.message} code: ${t instanceof u.SceytCallException ? t.code : ""}`,
                                )
                              : t.event !== s.SignalEvent.ERROR
                                ? this.processJoinCall(e, t, "from joinCall")
                                : h.error(
                                    `[2141] [CallId: ${e.id}] SYNC JOIN failed message: ${t.error ? `${t.error.message} code: ${t.error.code}` : ""}`,
                                  );
                          }),
                      ))
                    : t.forEach((e) => {
                        e.stop();
                      });
                }),
                e
              );
            }
            joinCall(e) {
              let t = null;
              try {
                h.info(
                  "[2159] [CallId: GLOBAL_LOGS] joinCall, start new call",
                  { color: "blue" },
                );
                const { call: i, answer: n } = this.findOrCreateCall(e);
                if (!i.setState(s.CallState.Connecting, "joinCall"))
                  throw new Error(
                    `Failed to set call state from ${i.state} to connecting`,
                  );
                return (
                  (i.localParticipant.state = s.ParticipantState.Joined),
                  (i.localParticipant.clientId = this.clientId),
                  (t = this.startCall(i, e, n)),
                  i
                );
              } catch (e) {
                return (
                  h.error(
                    `[2173] [CallId: ${null == t ? void 0 : t.id}] Join call failed: ${e.message || JSON.stringify(e)}`,
                    { color: "red" },
                  ),
                  t
                );
              }
            }
            updateCallMetadata(e, t) {
              ((e.metadata = t.metadata || 0),
                (e.createdBy = t.createdBy),
                (e.sessionId = t.sessionId),
                (e.id = t.id),
                h.info(
                  `[2187] [CallId: ${e.id}] Updated call metadata for call ${e.id}`,
                  { color: "light-blue" },
                ));
            }
            syncParticipants(e, t) {
              (h.info(
                `[2198] [CallId: ${e.id}] Syncing participants for call ${e.id}`,
                { color: "light-blue" },
              ),
                (e.participants = e.participants.filter((i) => {
                  const n = t.find(
                    (e) =>
                      !(
                        e.id !== i.id ||
                        (e.clientId !== i.clientId && e.clientId && i.clientId)
                      ),
                  );
                  return (
                    n ||
                      (h.info(
                        `[2202] [CallId: ${e.id}] Removing participant ${i.id} who is no longer in the call`,
                        { color: "light-blue" },
                      ),
                      e.emitParticipantStateChanged(i, s.ParticipantState.Left),
                      e.kickParticipantFromList(i)),
                    !!n
                  );
                })),
                h.info(
                  `[2216] [CallId: ${e.id}] Syncing participants for call ${e.id}`,
                  { color: "light-blue" },
                ));
              for (const i of t) {
                const t = e.participants.find(
                  (e) =>
                    !(
                      e.id !== i.id ||
                      (e.clientId !== i.clientId && i.clientId && e.clientId)
                    ),
                );
                if (
                  (h.info(
                    `[2219] [CallId: ${e.id}] Syncing participants for call ${e.id}`,
                    { color: "light-blue" },
                  ),
                  t)
                ) {
                  if (
                    (t.clientId || (t.clientId = i.clientId),
                    t.id === e.localParticipant.id &&
                      t.clientId === e.localParticipant.clientId)
                  ) {
                    i.state === s.ParticipantState.Joined &&
                      e.localParticipant.state > s.ParticipantState.Joined &&
                      this.leaveCall(e, !0, "syncParticipants");
                    continue;
                  }
                  ((t.state = i.state),
                    e.emitParticipantStateChanged(t, i.state),
                    t.state !== s.ParticipantState.Joined
                      ? t.getFullId() !== e.localParticipant.getFullId() &&
                        (this.closePeerConnections(e.id, t.getFullId()),
                        e.activeSpeakerManager.removeParticipant(t))
                      : t.id !== e.localParticipant.id &&
                        t.clientId !== e.localParticipant.clientId &&
                        e.state === s.CallState.Connected &&
                        this.handleNewParticipant(e, t),
                    t.getFullId() === e.localParticipant.getFullId() &&
                      (e.localParticipant = t),
                    this.syncParticipantMediaState(e, t, i),
                    h.info(
                      `[2254] [CallId: ${e.id}] Syncing existing participants: ${t.getFullId()} for call ${e.id}`,
                      { color: "light-blue" },
                    ));
                } else {
                  const t = new a.Participant(i.id, i.clientId);
                  ((t.state = i.state),
                    e.addParticipantToList(t),
                    this.syncParticipantMediaState(e, t, i),
                    h.info(
                      `[2263] [CallId: ${e.id}] Syncing no existing participants: ${t.getFullId()} for call ${e.id}`,
                      { color: "light-blue" },
                    ),
                    e.emitParticipantsAdded([t], s.ParticipantEntryType.ADDED),
                    ((e.mediaFlow !== s.MediaFlow.SFU &&
                      i.state === s.ParticipantState.Joined) ||
                      (e.mediaFlow === s.MediaFlow.SFU &&
                        i.connectionState ===
                          s.MediaConnectionState.Connected &&
                        e.state === s.CallState.Connected)) &&
                      this.handleNewParticipant(e, t));
                }
              }
            }
            syncParticipantMediaState(e, t, i) {
              if (
                t.getFullId() ===
                i.id + (i.clientId ? "/" + i.clientId : "")
              ) {
                const n = !!i.hasOwnProperty("muted") && i.muted,
                  a = !!i.hasOwnProperty("screenSharing") && i.screenSharing,
                  l = !!i.hasOwnProperty("videoEnabled") && i.videoEnabled,
                  r = !!i.hasOwnProperty("onHold") && i.onHold,
                  s = !!i.hasOwnProperty("isCallSilenced") && i.isCallSilenced;
                (n !== t.muted &&
                  (h.info(
                    `[2287] [CallId: ${e.id}] Participant ${t.getFullId()} audio state changed: ${t.muted} -> ${n}`,
                    { color: "light-blue" },
                  ),
                  t.setMuted(n),
                  n
                    ? e.emitParticipantEvent(t, "Mute")
                    : e.emitParticipantEvent(t, "Unmute")),
                  l === t.videoEnabled ||
                    a ||
                    (h.info(
                      `[2296] [CallId: ${e.id}] Participant ${t.getFullId()} video state changed: ${t.videoEnabled} -> ${l}`,
                      { color: "light-blue" },
                    ),
                    t.setVideoEnabled(l),
                    l
                      ? e.emitParticipantEvent(t, "VideoEnabled")
                      : e.emitParticipantEvent(t, "VideoDisabled")),
                  a !== t.screenSharing &&
                    (h.info(
                      `[2307] [CallId: ${e.id}] Participant ${t.getFullId()} screen sharing state changed: ${t.screenSharing} -> ${a}`,
                      { color: "light-blue" },
                    ),
                    t.setScreenSharing(a),
                    a
                      ? e.emitParticipantEvent(t, "ScreenSharingStarted")
                      : e.emitParticipantEvent(t, "ScreenSharingStopped")),
                  r !== t.onHold &&
                    (h.info(
                      `[2317] [CallId: ${e.id}] Participant ${t.getFullId()} hold state changed: ${t.onHold} -> ${r}`,
                      { color: "light-blue" },
                    ),
                    t.setHold(r),
                    r
                      ? e.emitParticipantEvent(t, "Hold")
                      : e.emitParticipantEvent(t, "Unhold")),
                  s !== !!t.isCallSilenced &&
                    (h.info(
                      `[2327] [CallId: ${e.id}] Participant ${t.getFullId()} ring allowed state changed: ${t.isCallSilenced} -> ${s}`,
                      { color: "light-blue" },
                    ),
                    e.setIsCallSilenced(s)));
              }
            }
            handleNewParticipant(e, t) {
              if (
                (h.info(
                  `[2333] [CallId: ${e.id}] Call media flow: ${e.mediaFlow}`,
                  { color: "light-blue" },
                ),
                e.mediaFlow !== s.MediaFlow.SFU)
              ) {
                if (
                  (t.updateState(s.ParticipantState.Joined, e.id),
                  e.emitParticipantStateChanged(t, s.ParticipantState.Joined),
                  t.getFullId() !== e.localParticipant.getFullId() &&
                    t.connectionState !==
                      s.ParticipantConnectionState.Connected &&
                    t.connectionState !==
                      s.ParticipantConnectionState.Reconnecting)
                ) {
                  const i = (t) => {
                    t instanceof u.SceytCallException || t instanceof Error
                      ? h.error(
                          `[2341] [CallId: ${e.id}] SYNC OFFER signal sent failed message: ${t.message} code: ${t instanceof u.SceytCallException ? t.code : ""}`,
                          { color: "red" },
                        )
                      : t.event === s.SignalEvent.ERROR &&
                        h.error(
                          `[2345] [CallId: ${e.id}] SYNC OFFER signal sent failed message: ${t.error ? `${t.error.message} code: ${t.error.code}` : ""}`,
                          { color: "red" },
                        );
                  };
                  (h.info(
                    `[2370] [CallId: ${e.id}] Sending offer to participant: ${t.getFullId()}`,
                  ),
                    e.mediaFlow === s.MediaFlow.P2P &&
                    this.isPolitePeer(
                      t.getFullId(),
                      e.localParticipant.getFullId(),
                    )
                      ? this.sendOfferPeerToPeer(e, t, i)
                      : (this.signalingClient.clearParticipantSignals(
                          e.id,
                          t.getFullId(),
                        ),
                        this.signalingClient.sendSignalMessage(
                          {
                            to: t.getFullId(),
                            mediaFlow: e.mediaFlow,
                            callId: e.id,
                            event: s.SignalEvent.CONNECT,
                            sessionId: e.sessionId,
                          },
                          i,
                        )));
                }
              } else if (
                t.getFullId() !== e.localParticipant.getFullId() &&
                t.connectionState !== s.ParticipantConnectionState.Reconnecting
              ) {
                const i = (t) => {
                  t instanceof u.SceytCallException || t instanceof Error
                    ? h.error(
                        `[2354] [CallId: ${e.id}] SYNC CONNECT signal sent failed message: ${t.message} code: ${t instanceof u.SceytCallException ? t.code : ""}`,
                        { color: "red" },
                      )
                    : t.event !== s.SignalEvent.ERROR ||
                      h.error(
                        `[2358] [CallId: ${e.id}] SYNC CONNECT signal sent failed message: ${t.error ? `${t.error.message} code: ${t.error.code}` : ""}`,
                        { color: "red" },
                      );
                };
                (this.signalingClient.clearParticipantSignals(
                  e.id,
                  t.getFullId(),
                ),
                  this.signalingClient.sendSignalMessage(
                    {
                      to: t.getFullId(),
                      mediaFlow: e.mediaFlow,
                      callId: e.id,
                      event: s.SignalEvent.CONNECT,
                      sessionId: e.sessionId,
                    },
                    i,
                  ));
              }
            }
            handleConnectSignal(e) {
              if (!this.activeCalls) return;
              const t = this.activeCalls.find((t) => t.id === e.callId);
              if (t) {
                let i = t.participants.find((t) => t.getFullId() === e.from);
                i &&
                  this.sendOfferPeerToPeer(t, i, (e) => {
                    e instanceof u.SceytCallException || e instanceof Error
                      ? h.error(
                          `[2417] [CallId: ${t.id}] SYNC OFFER signal sent failed message: ${e.message} code: ${e instanceof u.SceytCallException ? e.code : ""}`,
                          { color: "red" },
                        )
                      : e.event === s.SignalEvent.ERROR &&
                        h.error(
                          `[2421] [CallId: ${t.id}] SYNC OFFER signal sent failed message: ${e.error ? `${e.error.message} code: ${e.error.code}` : ""}`,
                          { color: "red" },
                        );
                  });
              }
            }
            handleMediaFlowSwitch(e) {
              (h.info(
                `[2375] [CallId: ${e.id}] Switching call ${e.id} from P2P to SFU`,
                { color: "light-blue" },
              ),
                e.changeMediaFlow(s.MediaFlow.SFU));
              const t = new a.Participant(e.id);
              (e.setServerParticipant(t),
                h.info(
                  `[2395] [CallId: ${e.id}] Sending offer to server participant: ${t.getFullId()}`,
                ),
                this.sendOfferPeerToPeer(e, t, (t) => {
                  t instanceof u.SceytCallException || t instanceof Error
                    ? h.error(
                        `[2386] [CallId: ${e.id}] SYNC OFFER signal sent failed message: ${t.message} code: ${t instanceof u.SceytCallException ? t.code : ""}`,
                        { color: "red" },
                      )
                    : t.event === s.SignalEvent.ERROR &&
                      h.error(
                        `[2390] [CallId: ${e.id}] SYNC OFFER signal sent failed message: ${t.error ? `${t.error.message} code: ${t.error.code}` : ""}`,
                        { color: "red" },
                      );
                }),
                e.participants.forEach((e) => {
                  e.setShouldResetPeerConnection(!0);
                }));
            }
          }
          t.InternalCallHandler = S;
        },
        787: (e, t, i) => {
          (Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.Participant = void 0));
          const n = i(578),
            a = i(758),
            l = i(645),
            r = (0, l.createLogger)("ParticipantState"),
            s = (0, l.createLogger)("ConnectionState");
          t.Participant = class {
            constructor(e, t) {
              ((this.clientId = ""),
                (this.muted = !1),
                (this.onHold = !1),
                (this.videoEnabled = !1),
                (this.screenSharing = !1),
                (this.presenter = !1),
                (this.audioTracks = []),
                (this.videoTracks = []),
                (this.shouldResetPeerConnection = !1),
                (this.state = n.ParticipantState.Idle),
                (this.connectionState = n.ParticipantConnectionState.Idle));
              const i = e.split("/");
              ((this.id = i[0]), (this.clientId = t || i[1] || ""));
            }
            updateState(e, t) {
              const i = new a.ParticipantStateMachine(this.id, t).updateState(
                e,
                this.state,
              );
              return (
                i &&
                  ((this.state = e),
                  r.info(
                    `[35] [CallId: ${t}] Updating state: ${e}, participantID: ${this.getFullId()}`,
                    { color: "blue" },
                  )),
                i
              );
            }
            updateConnectionState(e, t) {
              const i = new a.ParticipantStateMachine(
                this.id,
                t,
              ).updateConnectionState(e, this.connectionState);
              return (
                i &&
                  ((this.connectionState = e),
                  s.info(
                    `[45] [CallId: ${t}] Updating connection state: ${e}, participantID: ${this.getFullId()}`,
                    { color: "blue" },
                  )),
                i
              );
            }
            setShouldResetPeerConnection(e) {
              this.shouldResetPeerConnection = e;
            }
            setMuted(e) {
              (this.audioTracks.forEach((t) => {
                t.enabled = !e;
              }),
                (this.muted = e));
            }
            setVideoEnabled(e) {
              (this.videoTracks.forEach((t) => {
                t.enabled = e;
              }),
                (this.videoEnabled = e));
            }
            setScreenSharing(e) {
              (this.videoTracks.forEach((t) => {
                t.enabled = e;
              }),
                (this.screenSharing = e));
            }
            setPresenter(e) {
              this.presenter = e;
            }
            setAudioTracks(e) {
              this.audioTracks = e;
            }
            setVideoTracks(e) {
              this.videoTracks = e;
            }
            setHold(e) {
              this.onHold = e;
            }
            serialize() {
              return { id: this.id, clientId: this.clientId };
            }
            getFullId() {
              return this.id + (this.clientId ? "/" + this.clientId : "");
            }
          };
        },
        816: (e, t) => {
          (Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.QueryBuilder = void 0),
            (t.QueryBuilder = class {
              constructor() {
                this.count = 10;
              }
            }));
        },
        185: (e, t, i) => {
          (Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.RecentCallQueryBuilder = void 0));
          const n = i(578),
            a = i(681),
            l = i(650),
            r = i(816),
            s = i(343);
          class o extends r.QueryBuilder {
            constructor() {
              (super(...arguments),
                (this.order = n.CDRRequestOrder.ASC),
                (this.count = 10),
                (this.participantCount = 10),
                (this.event = n.CDRRequestEvent.GET_RECENT_CALLS),
                (this.direction = n.CDRRequestDirection.NEXT),
                (this.setSessionIdList = (e) => (
                  (this.sessionIdList = e),
                  this
                )),
                (this.setEvent = (e) => ((this.event = e), this)),
                (this.setSessionId = (e) => ((this.sessionId = e), this)),
                (this.limit = (e) => ((this.count = e), this)),
                (this.setParticipantCount = (e) => (
                  (this.participantCount = e),
                  this
                )),
                (this.setOrder = (e) => ((this.order = e), this)),
                (this.setDirection = (e) => ((this.direction = e), this)),
                (this.build = () => {
                  const e = l.InternalCallHandler.getInstance();
                  this.chatClient = e.chatClient;
                  try {
                    return new s.RecentCallQuery(this);
                  } catch (e) {
                    throw new a.SceytChatError(
                      null == e ? void 0 : e.message,
                      null == e ? void 0 : e.code,
                    );
                  }
                }));
            }
          }
          t.RecentCallQueryBuilder = o;
        },
        343: function (e, t, i) {
          var n =
            (this && this.__awaiter) ||
            function (e, t, i, n) {
              return new (i || (i = Promise))(function (a, l) {
                function r(e) {
                  try {
                    o(n.next(e));
                  } catch (e) {
                    l(e);
                  }
                }
                function s(e) {
                  try {
                    o(n.throw(e));
                  } catch (e) {
                    l(e);
                  }
                }
                function o(e) {
                  var t;
                  e.done
                    ? a(e.value)
                    : ((t = e.value),
                      t instanceof i
                        ? t
                        : new i(function (e) {
                            e(t);
                          })).then(r, s);
                }
                o((n = n.apply(e, t || [])).next());
              });
            };
          (Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.RecentCallQuery = void 0));
          const a = i(578),
            l = i(681),
            r = (0, i(645).createLogger)("RecentCallQuery");
          t.RecentCallQuery = class {
            constructor(e) {
              ((this.count = 10),
                (this.hasNext = !0),
                (this.loading = !1),
                (this.order = a.CDRRequestOrder.ASC),
                (this.participantCount = 10),
                (this.event = a.CDRRequestEvent.GET_RECENT_CALLS),
                (this.direction = a.CDRRequestDirection.NEXT),
                (this.loadNextPage = () =>
                  n(this, void 0, void 0, function* () {
                    if (this.loading)
                      throw (
                        r.info("QUERY_IN_PROGRESS"),
                        new l.SceytChatError("QUERY_IN_PROGRESS", 9908)
                      );
                    if (this.hasNext) {
                      this.loading = !0;
                      const e = yield this.chatClient.sendCallDetailsRecord(
                        Object.assign(
                          {
                            event: this.event,
                            order: this.order,
                            limit: this.count,
                            participantCount: this.participantCount,
                            direction: this.direction,
                          },
                          this.nextToken || this.sessionId
                            ? {
                                position: Object.assign(
                                  Object.assign(
                                    {},
                                    this.sessionId
                                      ? { sessionId: this.sessionId }
                                      : {},
                                  ),
                                  this.nextToken
                                    ? { nextToken: this.nextToken }
                                    : {},
                                ),
                              }
                            : {},
                        ),
                      );
                      this.loading = !1;
                      const {
                        getRecentCallsResponse: { records: t, nextToken: i },
                      } = e;
                      return (
                        (this.hasNext = !!i),
                        (this.nextToken = i),
                        { records: t, hasNext: this.hasNext }
                      );
                    }
                    return { records: [], hasNext: this.hasNext };
                  })),
                (this.deleteCalls = () =>
                  n(this, void 0, void 0, function* () {
                    var e;
                    if (
                      null === (e = this.sessionIdList) || void 0 === e
                        ? void 0
                        : e.length
                    )
                      return yield this.chatClient.sendCallDetailsRecord({
                        event: a.CDRRequestEvent.DELETE_RECENT_CALLS,
                        sessionIdList: { items: this.sessionIdList },
                      });
                  })),
                (this.order = e.order),
                (this.count = e.count),
                (this.participantCount = e.participantCount),
                (this.sessionId = e.sessionId),
                (this.event = e.event),
                (this.direction = e.direction),
                (this.chatClient = e.chatClient),
                (this.sessionIdList = e.sessionIdList));
            }
            set limit(e) {
              this.count = e;
            }
            get limit() {
              return this.count;
            }
          };
        },
        680: (e, t, i) => {
          (Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.toSessionDescription = t.toSessionData = void 0));
          const n = i(578),
            a = i(645),
            l = i(19),
            r = (0, a.createLogger)("SignalingExtensions");
          ((t.toSessionData = function (e, t) {
            const i = e.sdp.sdp || "",
              a = 1e3 * Date.now() + (performance.now() % 1) * 1e3;
            r.info(`[32] [CALL_TIME_TO_SESSION_DATA_START: ${a}]`, {
              color: "blue",
            });
            const s = l.SdpConverter.parseToSdpData(
                i,
                l.CODEC_NAME_TO_VIDEO_CODEC,
                t === n.MediaFlow.S2W
                  ? l.CODEC_NAME_TO_AUDIO_CODEC_S2W
                  : l.CODEC_NAME_TO_AUDIO_CODEC,
              ),
              o = 1e3 * Date.now() + (performance.now() % 1) * 1e3;
            return (
              r.info(`[35] [CALL_TIME_TO_SESSION_DATA_END: ${o}]`, {
                color: "blue",
              }),
              r.info(
                `[34] [CallId: ${e.sessionId}] toSessionData in sdp-converter: sdpData: ${JSON.stringify(s || {})}, type: ${e.sdp.type}, sessionId: ${e.sessionId}, versionId: ${e.versionId}`,
                { color: "blue" },
              ),
              { id: e.sessionId, version: e.versionId, sdpData: s }
            );
          }),
            (t.toSessionDescription = function (e, t) {
              if (
                (r.info(
                  `[50] [CallId: ${e.id}] toSessionDescription in sdp-converter: sessionData: ${JSON.stringify((null == e ? void 0 : e.sdpData) || {})}, type: ${t}, id: ${e.id}, version: ${e.version}`,
                  { color: "blue" },
                ),
                e.sdpData)
              ) {
                const i = l.SdpConverter.reconstructFromSDPData(e.sdpData);
                return (
                  r.info(
                    `[53] [CallId: ${e.id}] toSessionDescription in sdp-converter: sdp: ${i}`,
                    { color: "blue" },
                  ),
                  { type: t, sdp: i }
                );
              }
              return (
                r.error("SessionData has neither sdpData nor sdp field"),
                null
              );
            }));
        },
        19: (e, t, i) => {
          (Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.SdpConverter =
              t.CODEC_NAME_TO_AUDIO_CODEC_S2W =
              t.CODEC_NAME_TO_AUDIO_CODEC =
              t.CODEC_NAME_TO_VIDEO_CODEC =
                void 0));
          const n = i(645),
            a = i(799),
            l = (0, n.createLogger)("SdpConverter");
          ((t.CODEC_NAME_TO_VIDEO_CODEC = ["vp8", "rtx", "red"]),
            (t.CODEC_NAME_TO_AUDIO_CODEC = ["opus", "red"]),
            (t.CODEC_NAME_TO_AUDIO_CODEC_S2W = [
              "opus",
              "red",
              "pcmu",
              "pcma",
            ]));
          class r {
            static parseToSdpData(
              e,
              i = t.CODEC_NAME_TO_VIDEO_CODEC,
              n = t.CODEC_NAME_TO_AUDIO_CODEC,
            ) {
              var a, l, s;
              const o = [],
                c = e
                  .split("\n")
                  .map((e) => e.trim())
                  .filter((e) => e.length > 0),
                d = r.extractSessionId(c) || "",
                p = r.extractSessionVersion(c) || 0,
                u = r.extractOriginAddress(c) || "127.0.0.1",
                g =
                  (null === (a = c.find((e) => e.startsWith("s="))) ||
                  void 0 === a
                    ? void 0
                    : a.substring(2)) || "-",
                h =
                  (null ===
                    (l = c.find(
                      (e, t) => e.startsWith("c=") && !r.inMediaSection(c, t),
                    )) || void 0 === l
                    ? void 0
                    : l.split(" ").slice(2)[0]) || "",
                S =
                  (null ===
                    (s = r.firstValueStartingWith(c, "a=msid-semantic:")) ||
                  void 0 === s
                    ? void 0
                    : s.trim()) || "WMS",
                C = r.parseBundleGroup(c),
                f = c.findIndex((e) => e.startsWith("m=")),
                v = f > 0 ? c.slice(0, f) : c,
                I = r.firstValueStartingWith(v, "a=ice-ufrag:") || "",
                E = r.firstValueStartingWith(v, "a=ice-pwd:") || "",
                m = r.parseIceOptions(v),
                P = r.parseFingerprint(v),
                $ = r.parseSetup(v),
                y = v.some((e) => "a=ice-lite" === e),
                T = v.some((e) => "a=extmap-allow-mixed" === e);
              return {
                sessionId: d,
                sessionVersion: p,
                bundleGroup: C,
                iceUfrag: I,
                icePwd: E,
                iceOptions: m,
                fingerprint: P,
                setup: $,
                media: r.parseMediaSections(c, o, i, n),
                sessionName: g,
                originAddress: u,
                connectionAddress: h,
                msidSemantic: S,
                iceLite: y,
                extmapAllowMixed: T,
                stringPool: o,
              };
            }
            static reconstructFromSDPData(e) {
              var t, i, n, a, s, o;
              try {
                const c = [];
                if (
                  (c.push("v=0\r\n"),
                  c.push(
                    `o=- ${e.sessionId} ${e.sessionVersion} IN IP4 ${e.originAddress}\r\n`,
                  ),
                  c.push(`s=${e.sessionName}\r\n`),
                  c.push("t=0 0\r\n"),
                  (null ===
                    (i =
                      null === (t = e.fingerprint) || void 0 === t
                        ? void 0
                        : t.hashValue) || void 0 === i
                    ? void 0
                    : i.length) > 0 &&
                    c.push(
                      `a=fingerprint:${r.fingerprintToString(e.fingerprint)}\r\n`,
                    ),
                  (null === (n = null == e ? void 0 : e.bundleGroup) ||
                  void 0 === n
                    ? void 0
                    : n.length) > 0)
                ) {
                  const t = e.media.map((e) => e.mid).join(" ");
                  c.push(`a=group:BUNDLE ${t}\r\n`);
                }
                ((null === (a = null == e ? void 0 : e.iceOptions) ||
                void 0 === a
                  ? void 0
                  : a.length) > 0 &&
                  c.push(`a=ice-options:${e.iceOptions.join(" ")}\r\n`),
                  (null == e ? void 0 : e.extmapAllowMixed) &&
                    c.push("a=extmap-allow-mixed\r\n"),
                  (null === (s = null == e ? void 0 : e.msidSemantic) ||
                  void 0 === s
                    ? void 0
                    : s.length) > 0 &&
                    c.push(`a=msid-semantic: ${e.msidSemantic}\r\n`),
                  (null == e ? void 0 : e.iceLite) && c.push("a=ice-lite\r\n"),
                  null === (o = null == e ? void 0 : e.media) ||
                    void 0 === o ||
                    o.forEach((t) => {
                      r.buildMediaSection(c, t, e);
                    }));
                const d = c.join("");
                if (
                  (l.debug(
                    `Reconstructed SDP (${null == d ? void 0 : d.length} bytes)`,
                  ),
                  !(null == d ? void 0 : d.includes("m=")))
                )
                  throw new Error("Reconstructed SDP missing media lines");
                if (
                  !(null == d ? void 0 : d.includes("a=ice-ufrag:")) &&
                  !(null == d ? void 0 : d.includes("a=ice-pwd:"))
                )
                  throw new Error("Reconstructed SDP missing ICE credentials");
                return d;
              } catch (e) {
                throw (
                  l.error(
                    `[647] [CallId: GLOBAL_LOGS] Failed to reconstruct SDP: ${e.message}`,
                    { color: "red" },
                  ),
                  l.error(e, { color: "red" }),
                  e
                );
              }
            }
            static extractSessionId(e) {
              const t = e.find((e) => e.startsWith("o="));
              return (t && t.split(" ")[1]) || null;
            }
            static extractSessionVersion(e) {
              const t = e.find((e) => e.startsWith("o="));
              if (!t) return null;
              const i = t.split(" "),
                n = parseInt(i[2] || "0", 10);
              return isNaN(n) ? null : n;
            }
            static extractOriginAddress(e) {
              const t = e.find((e) => e.startsWith("o="));
              return (t && t.split(" ")[5]) || null;
            }
            static parseBundleGroup(e) {
              const t = e.find((e) => e.startsWith("a=group:BUNDLE "));
              return t
                ? t
                    .substring(15)
                    .split(" ")
                    .map((e) => parseInt(e, 10))
                    .filter((e) => !isNaN(e))
                : [];
            }
            static parseIceOptions(e) {
              const t = e.find((e) => e.startsWith("a=ice-options:"));
              return t ? t.substring(14).split(" ") : [];
            }
            static parseFingerprint(e) {
              var t;
              const i = e.find((e) => e.startsWith("a=fingerprint:"));
              if (i) {
                const e = i.substring(14).split(" ", 2);
                if (2 === e.length) {
                  let i;
                  switch (e[0].toLowerCase()) {
                    case "sha-256":
                    default:
                      i = a.HashFunction.SHA256;
                      break;
                    case "sha-1":
                      i = a.HashFunction.SHA1;
                      break;
                    case "sha-384":
                      i = a.HashFunction.SHA384;
                      break;
                    case "sha-512":
                      i = a.HashFunction.SHA512;
                      break;
                    case "md5":
                      i = a.HashFunction.MD5;
                  }
                  const n = e[1].replace(/:/g, "");
                  return {
                    hashFunc: i,
                    hashValue: new Uint8Array(
                      (null === (t = n.match(/.{1,2}/g)) || void 0 === t
                        ? void 0
                        : t.map((e) => parseInt(e, 16))) || [],
                    ),
                  };
                }
              }
              return {
                hashFunc: a.HashFunction.SHA256,
                hashValue: new Uint8Array(0),
              };
            }
            static parseSetup(e) {
              const t = e.find((e) => e.startsWith("a=setup:"));
              switch (null == t ? void 0 : t.substring(8).toLowerCase()) {
                case "active":
                  return a.DTLSSetup.ACTIVE;
                case "passive":
                  return a.DTLSSetup.PASSIVE;
                default:
                  return a.DTLSSetup.ACTPASS;
              }
            }
            static firstValueStartingWith(e, t) {
              const i = e.find((e) => e.startsWith(t));
              return i ? i.substring(t.length) : null;
            }
            static inMediaSection(e, t) {
              return e
                .map((e, t) => ({ line: e, index: t }))
                .filter(({ line: e }) => e.startsWith("m="))
                .map(({ index: e }) => e)
                .some((e) => e < t);
            }
            static parseMediaSections(e, t, i, n) {
              const a = e
                .map((e, t) => ({ line: e, index: t }))
                .filter(({ line: e }) => e.startsWith("m="))
                .map(({ index: e }) => e);
              return a
                .map((l, s) => {
                  const o = s < a.length - 1 ? a[s + 1] : e.length;
                  return r.parseMediaSection(e.slice(l, o), t, i, n);
                })
                .filter((e) => null !== e);
            }
            static parseMediaSection(e, t, i, n) {
              var s;
              try {
                const i = e[0].substring(2).split(" ");
                let n;
                switch (i[0].toLowerCase()) {
                  case "audio":
                    n = a.MediaType.AUDIO;
                    break;
                  case "video":
                    n = a.MediaType.VIDEO;
                    break;
                  default:
                    n = a.MediaType.MEDIA_TYPE_UNSPECIFIED;
                }
                if (n === a.MediaType.MEDIA_TYPE_UNSPECIFIED)
                  return (l.warn(`Skipping unknown media type: ${i[0]}`), null);
                const o = parseInt(i[1] || "9", 10) || 9,
                  c = i
                    .slice(3)
                    .map((e) => parseInt(e, 10))
                    .filter((e) => !isNaN(e)),
                  d = r.firstValueStartingWith(e, "a=mid:") || "",
                  p = r.parseDirection(e),
                  u = r.firstValueStartingWith(e, "a=msid:"),
                  [g, h, S] = r.parseMSID(u || null),
                  C = e.some((e) => "a=rtcp-mux" === e),
                  f = e.some((e) => "a=rtcp-rsize" === e),
                  v = e.some((e) => "a=end-of-candidates" === e),
                  I =
                    (null === (s = e.find((e) => e.startsWith("c="))) ||
                    void 0 === s
                      ? void 0
                      : s.split(" ")[2]) || "",
                  E = r.firstValueStartingWith(e, "a=rtcp:") || "",
                  m = new Map(),
                  P = [];
                (c.forEach((e) => {
                  (m.set(e, {
                    codecName: { id: e, mapKey: 0 },
                    fmtp: [],
                    rtcpFeedbackIds: [],
                  }),
                    P.push(e));
                }),
                  e
                    .filter((e) => e.startsWith("a=rtpmap:"))
                    .forEach((e) => {
                      const t = e.substring(9).split(" ", 2);
                      if (2 === t.length) {
                        const e = parseInt(t[0], 10);
                        if (!isNaN(e)) {
                          const i = t[1];
                          r.dynamicCodecNames.set(e, i);
                          const n = r.CODEC_NAME_TO_MAP_KEY.get(i) || 0;
                          if (m.has(e)) {
                            const t = m.get(e);
                            m.set(e, {
                              codecName: { id: e, mapKey: n },
                              fmtp: t.fmtp,
                              rtcpFeedbackIds: t.rtcpFeedbackIds,
                            });
                          }
                        }
                      }
                    }),
                  e
                    .filter((e) => e.startsWith("a=fmtp:"))
                    .forEach((e) => {
                      const t = e.substring(7).split(" ", 2);
                      if (2 === t.length) {
                        const e = parseInt(t[0], 10);
                        if (!isNaN(e) && m.has(e)) {
                          const i = r.parseFmtp(t[1]),
                            n = m.get(e);
                          m.set(e, {
                            codecName: n.codecName,
                            fmtp: i,
                            rtcpFeedbackIds: n.rtcpFeedbackIds,
                          });
                        }
                      }
                    }),
                  e
                    .filter((e) => e.startsWith("a=rtcp-fb:"))
                    .forEach((e) => {
                      const t = e.substring(10).split(" ");
                      if (t.length >= 2) {
                        const e = parseInt(t[0], 10);
                        if (!isNaN(e)) {
                          let i = "";
                          for (let e = 1; e < t.length; e++)
                            i += t[e] + (e !== t.length - 1 ? " " : "");
                          const n = r.RTCP_FEEDBACK_STRING_TO_ID.get(i);
                          if (void 0 !== n && m.has(e)) {
                            const t = m.get(e),
                              i = [...t.rtcpFeedbackIds];
                            (i.includes(n) || i.push(n),
                              m.set(e, {
                                codecName: t.codecName,
                                fmtp: t.fmtp,
                                rtcpFeedbackIds: i,
                              }));
                          }
                        }
                      }
                    }));
                const $ = P.map((e) => m.get(e)).filter((e) => void 0 !== e),
                  y = r.parseExtmaps(e),
                  T = r.parseSsrcs(e),
                  O = r.parseSsrcGroups(e),
                  w = r.parseCandidates(e),
                  F = r.firstValueStartingWith(e, "a=ice-ufrag:"),
                  R = r.firstValueStartingWith(e, "a=ice-pwd:"),
                  b = F ? r.addToStringPool(t, F) : 0,
                  A = R ? r.addToStringPool(t, R) : 0,
                  _ = e.find((e) => e.startsWith("a=ice-options:")),
                  M = _ ? _.substring(14).split(" ") : void 0,
                  N = e.find((e) => e.startsWith("a=fingerprint:")),
                  k = N
                    ? r.parseFingerprint([N])
                    : {
                        hashFunc: a.HashFunction.SHA256,
                        hashValue: new Uint8Array(0),
                      },
                  D = e.find((e) => e.startsWith("a=setup:"));
                return {
                  type: n,
                  mid: d,
                  direction: p,
                  msidStream: g,
                  msidTrackLabel: h,
                  msidTrackId: S,
                  rtcpMux: C,
                  rtcpRsize: f,
                  extmaps: y,
                  codecs: $,
                  ssrcGroups: O,
                  ssrcs: T,
                  connectionAddress: I,
                  candidates: w,
                  endOfCandidates: v,
                  rtcpAddress: E,
                  iceUfragRef: b,
                  icePwdRef: A,
                  iceOptions: M,
                  fingerprint: k,
                  setup: D ? r.parseSetup([D]) : a.DTLSSetup.ACTPASS,
                  port: o,
                };
              } catch (e) {
                return (
                  l.error(
                    `[647] [CallId: GLOBAL_LOGS] Failed to parse media section: ${e.message}`,
                    { color: "red" },
                  ),
                  l.error(e, { color: "red" }),
                  null
                );
              }
            }
            static parseDirection(e) {
              return e.some((e) => "a=sendrecv" === e)
                ? a.MediaDirection.SENDRECV
                : e.some((e) => "a=sendonly" === e)
                  ? a.MediaDirection.SENDONLY
                  : e.some((e) => "a=recvonly" === e)
                    ? a.MediaDirection.RECVONLY
                    : e.some((e) => "a=inactive" === e)
                      ? a.MediaDirection.INACTIVE
                      : a.MediaDirection.SENDRECV;
            }
            static parseMSID(e) {
              if (!e || 0 === e.trim().length) return ["", "", 0];
              const t = e.split(" ", 2);
              if (t.length < 2) return [e, "", 0];
              const i = t[0],
                n = t[1],
                a = n.lastIndexOf("_");
              if (a > 0) {
                const e = n.substring(a + 1),
                  t = parseInt(e, 10);
                if (!isNaN(t)) return [i, n.substring(0, a + 1), t];
              }
              return [i, n, 0];
            }
            static parseFmtp(e) {
              if (0 === e.trim().length) return [];
              const t = [];
              return (
                e.split(";").forEach((e) => {
                  const i = e.trim();
                  if (0 !== i.length)
                    if (i.includes("=")) {
                      const e = i.split("=", 2);
                      t.push({ key: e[0].trim(), value: e[1].trim() });
                    } else t.push({ key: "value", value: i });
                }),
                t
              );
            }
            static parseExtmaps(e) {
              return e
                .filter((e) => e.startsWith("a=extmap:"))
                .map((e) => {
                  const t = e.substring(9).split(" ", 2);
                  if (2 !== t.length) return null;
                  const i = t[0].split("/")[0],
                    n = parseInt(i, 10);
                  if (isNaN(n)) return null;
                  const a = t[1];
                  return { id: n, mapKey: r.URI_TO_EXTMAP_ID.get(a) || 0 };
                })
                .filter((e) => null !== e);
            }
            static parseSsrcs(e) {
              const t = new Map();
              return (
                e
                  .filter((e) => e.startsWith("a=ssrc:"))
                  .forEach((e) => {
                    const i = e.substring(7).split(" ");
                    if (i.length >= 2) {
                      const e = parseInt(i[0], 10);
                      if (isNaN(e)) return;
                      const n = e,
                        a = t.get(n) || {};
                      if (i[1].startsWith("cname:"))
                        a.cname = i[1].substring(6);
                      else if (i[1].startsWith("msid:")) {
                        let e = "";
                        for (let t = 1; t < i.length; t++)
                          e +=
                            i[t].substring(1 === t ? 5 : 0) +
                            (i.length - 1 !== t ? " " : "");
                        a.msid = e;
                      }
                      t.set(n, a);
                    }
                  }),
                Array.from(t.entries()).map(([e, t]) => ({
                  id: e,
                  cname: t.cname || "",
                  msid: t.msid || "",
                }))
              );
            }
            static parseSsrcGroups(e) {
              return e
                .filter((e) => e.startsWith("a=ssrc-group:"))
                .map((e) => {
                  const t = e.substring(13).split(" ");
                  return t.length >= 2
                    ? {
                        semantics: t[0],
                        ssrcs: t
                          .slice(1)
                          .map((e) => parseInt(e, 10))
                          .filter((e) => !isNaN(e)),
                      }
                    : null;
                })
                .filter((e) => null !== e);
            }
            static parseCandidates(e) {
              return e
                .filter((e) => e.startsWith("a=candidate:"))
                .map((e) => r.parseCandidate(e.substring(12)))
                .filter((e) => null !== e);
            }
            static parseCandidate(e) {
              const t = e.split(" ");
              if (t.length < 8) return null;
              const i = parseInt(t[0], 10);
              if (isNaN(i)) return null;
              const n = parseInt(t[1], 10);
              if (isNaN(n)) return null;
              let l;
              switch (t[2].toLowerCase()) {
                case "udp":
                default:
                  l = a.IceCandidateProtocol.UDP;
                  break;
                case "tcp":
                  l = a.IceCandidateProtocol.TCP;
              }
              const r = parseInt(t[3], 10);
              if (isNaN(r)) return null;
              const s = t[4].split("."),
                o = new Uint8Array(s.map((e) => parseInt(e, 10))),
                c = parseInt(t[5], 10);
              if (isNaN(c)) return null;
              let d;
              switch (t[7].toLowerCase()) {
                case "host":
                default:
                  d = a.IceCandidateType.HOST;
                  break;
                case "srflx":
                  d = a.IceCandidateType.SRFLX;
                  break;
                case "prflx":
                  d = a.IceCandidateType.PRFLX;
                  break;
                case "relay":
                  d = a.IceCandidateType.RELAY;
              }
              let p = new Uint8Array(0),
                u = 0,
                g = a.IceCandidateTcpType.ACTIVE,
                h = 8;
              for (; h < t.length; ) {
                switch (t[h]) {
                  case "raddr":
                    if (h + 1 < t.length) {
                      const e = t[++h];
                      p = new Uint8Array(
                        e.split(".").map((e) => parseInt(e, 10)),
                      );
                    }
                    break;
                  case "rport":
                    h + 1 < t.length && (u = parseInt(t[++h], 10) || 0);
                    break;
                  case "tcptype":
                    if (h + 1 < t.length)
                      switch (t[++h].toLowerCase()) {
                        case "active":
                        default:
                          g = a.IceCandidateTcpType.ACTIVE;
                          break;
                        case "passive":
                          g = a.IceCandidateTcpType.PASSIVE;
                          break;
                        case "so":
                          g = a.IceCandidateTcpType.SO;
                      }
                }
                h++;
              }
              return {
                foundation: i,
                component: n,
                protocol: l,
                priority: r,
                ip: o,
                port: c,
                type: d,
                raddr: p,
                rport: u,
                tcptype: g,
              };
            }
            static addToStringPool(e, t) {
              if (0 === t.length) return 0;
              const i = e.indexOf(t);
              return i >= 0 ? i + 1 : (e.push(t), e.length);
            }
            static getFromStringPool(e, t) {
              return 0 === t || t > e.length ? "" : e[t - 1];
            }
            static getCodecID(e) {
              var t;
              return (
                (null === (t = e.codecName) || void 0 === t ? void 0 : t.id) ||
                0
              );
            }
            static getCodecName(e) {
              if (!e.codecName) return null;
              const t = e.codecName;
              if (t.mapKey > 0) {
                const e = r.MAP_KEY_TO_CODEC_NAME.get(t.mapKey);
                if (e) return e;
              }
              return r.dynamicCodecNames.get(t.id) || null;
            }
            static filterVideoCodecs(e, t) {
              if (0 === t.length) return e;
              const i = [],
                n = new Set();
              return (
                e.forEach((e) => {
                  const a = r.getCodecName(e);
                  if (!a) return;
                  const l = a.split("/")[0];
                  t.some((e) => e.toLowerCase() === l.toLowerCase()) &&
                    (i.push(e), n.add(r.getCodecID(e)));
                }),
                e.forEach((e) => {
                  const t = r.getCodecName(e);
                  if (t && t.toLowerCase().startsWith("rtx/")) {
                    const t = e.fmtp.find((e) => "apt" === e.key),
                      a = t ? parseInt(t.value, 10) : null;
                    null !== a && !isNaN(a) && n.has(a) && i.push(e);
                  }
                }),
                i
              );
            }
            static buildMediaSection(e, t, i) {
              var n, s, o, c, d, p, u, g, h, S;
              let C;
              switch (t.type) {
                case a.MediaType.AUDIO:
                  C = "audio";
                  break;
                case a.MediaType.VIDEO:
                  C = "video";
                  break;
                case a.MediaType.MEDIA_TYPE_UNSPECIFIED:
                  return void l.error(
                    "Cannot reconstruct MEDIA_TYPE_UNSPECIFIED",
                  );
              }
              const f =
                (null === (n = null == t ? void 0 : t.codecs) || void 0 === n
                  ? void 0
                  : n.map((e) => r.getCodecID(e).toString()).join(" ")) || "";
              e.push(`m=${C} ${t.port} UDP/TLS/RTP/SAVPF ${f}\r\n`);
              const v =
                (null == t ? void 0 : t.connectionAddress) ||
                (null == i ? void 0 : i.connectionAddress) ||
                "0.0.0.0";
              (e.push(`c=IN IP4 ${v}\r\n`),
                (null === (s = null == t ? void 0 : t.rtcpAddress) ||
                void 0 === s
                  ? void 0
                  : s.length) > 0 && e.push(`a=rtcp:${t.rtcpAddress}\r\n`));
              const I =
                  (null == t ? void 0 : t.iceUfragRef) > 0
                    ? r.getFromStringPool(
                        null == i ? void 0 : i.stringPool,
                        null == t ? void 0 : t.iceUfragRef,
                      )
                    : null == i
                      ? void 0
                      : i.iceUfrag,
                E =
                  (null == t ? void 0 : t.icePwdRef) > 0
                    ? r.getFromStringPool(
                        null == i ? void 0 : i.stringPool,
                        null == t ? void 0 : t.icePwdRef,
                      )
                    : null == i
                      ? void 0
                      : i.icePwd;
              (I.length > 0 && e.push(`a=ice-ufrag:${I}\r\n`),
                E.length > 0 && e.push(`a=ice-pwd:${E}\r\n`));
              const m =
                (null == t ? void 0 : t.iceOptions) ||
                (null == i ? void 0 : i.iceOptions);
              m.length > 0 && e.push(`a=ice-options:${m.join(" ")}\r\n`);
              const P =
                (null ===
                  (c =
                    null === (o = null == t ? void 0 : t.fingerprint) ||
                    void 0 === o
                      ? void 0
                      : o.hashValue) || void 0 === c
                  ? void 0
                  : c.length) > 0
                  ? null == t
                    ? void 0
                    : t.fingerprint
                  : null == i
                    ? void 0
                    : i.fingerprint;
              (null === (d = null == P ? void 0 : P.hashValue) || void 0 === d
                ? void 0
                : d.length) > 0 &&
                e.push(`a=fingerprint:${r.fingerprintToString(P)}\r\n`);
              const $ =
                (null == t ? void 0 : t.setup) !== a.DTLSSetup.ACTPASS ||
                (null == i ? void 0 : i.setup) === a.DTLSSetup.ACTPASS
                  ? t.setup
                  : i.setup;
              (e.push(`a=setup:${r.setupToString($)}\r\n`),
                e.push(`a=mid:${null == t ? void 0 : t.mid}\r\n`),
                null === (p = null == t ? void 0 : t.extmaps) ||
                  void 0 === p ||
                  p.forEach((t) => {
                    const i =
                      r.EXTMAP_ID_TO_URI.get(t.mapKey) ||
                      `urn:ietf:params:rtp-hdrext:extension-${t.id}`;
                    e.push(`a=extmap:${t.id} ${i}\r\n`);
                  }),
                e.push(
                  `a=${r.directionToString(null == t ? void 0 : t.direction)}\r\n`,
                ));
              const y = r.reconstructMSID(
                null == t ? void 0 : t.msidStream,
                null == t ? void 0 : t.msidTrackLabel,
                null == t ? void 0 : t.msidTrackId,
              );
              ((null == y ? void 0 : y.length) > 0 && e.push(`a=msid:${y}\r\n`),
                (null == t ? void 0 : t.rtcpMux) && e.push("a=rtcp-mux\r\n"),
                (null == t ? void 0 : t.rtcpRsize) &&
                  e.push("a=rtcp-rsize\r\n"),
                null === (u = null == t ? void 0 : t.codecs) ||
                  void 0 === u ||
                  u.forEach((t) => {
                    var i, n;
                    const a = r.getCodecID(t),
                      l = r.getCodecName(t);
                    if (
                      (l && e.push(`a=rtpmap:${a} ${l}\r\n`),
                      null === (i = null == t ? void 0 : t.rtcpFeedbackIds) ||
                        void 0 === i ||
                        i.forEach((t) => {
                          const i = r.RTCP_FEEDBACK_ID_TO_STRING.get(t);
                          i && e.push(`a=rtcp-fb:${a} ${i}\r\n`);
                        }),
                      (null === (n = null == t ? void 0 : t.fmtp) ||
                      void 0 === n
                        ? void 0
                        : n.length) > 0)
                    ) {
                      const i = r.reconstructFmtp(t.fmtp);
                      e.push(`a=fmtp:${a} ${i}\r\n`);
                    }
                  }),
                null === (g = null == t ? void 0 : t.ssrcGroups) ||
                  void 0 === g ||
                  g.forEach((t) => {
                    const i = t.ssrcs
                      .map((e) => (e >>> 0).toString())
                      .join(" ");
                    e.push(`a=ssrc-group:${t.semantics} ${i}\r\n`);
                  }),
                null === (h = null == t ? void 0 : t.ssrcs) ||
                  void 0 === h ||
                  h.forEach((t) => {
                    var i, n;
                    const a = (t.id >>> 0).toString();
                    ((null === (i = null == t ? void 0 : t.cname) ||
                    void 0 === i
                      ? void 0
                      : i.length) > 0 &&
                      e.push(`a=ssrc:${a} cname:${t.cname}\r\n`),
                      (null === (n = null == t ? void 0 : t.msid) ||
                      void 0 === n
                        ? void 0
                        : n.length) > 0 &&
                        e.push(`a=ssrc:${a} msid:${t.msid}\r\n`));
                  }),
                null === (S = null == t ? void 0 : t.candidates) ||
                  void 0 === S ||
                  S.forEach((t) => {
                    e.push(`a=candidate:${r.reconstructCandidate(t)}\r\n`);
                  }),
                (null == t ? void 0 : t.endOfCandidates) &&
                  e.push("a=end-of-candidates\r\n"));
            }
            static reconstructMSID(e, t, i) {
              return 0 === e.length
                ? ""
                : 0 === t.length && 0 === i
                  ? e
                  : i > 0 && t.length > 0
                    ? `${e} ${t}${i}`
                    : t.length > 0
                      ? `${e} ${t}`
                      : e;
            }
            static reconstructFmtp(e) {
              return e
                .map((e) =>
                  "value" === e.key ? e.value : `${e.key}=${e.value}`,
                )
                .join(";");
            }
            static fingerprintToString(e) {
              let t;
              switch (e.hashFunc) {
                case a.HashFunction.SHA256:
                  t = "sha-256";
                  break;
                case a.HashFunction.SHA1:
                  t = "sha-1";
                  break;
                case a.HashFunction.SHA384:
                  t = "sha-384";
                  break;
                case a.HashFunction.SHA512:
                  t = "sha-512";
                  break;
                case a.HashFunction.MD5:
                  t = "md5";
              }
              return `${t} ${Array.from(e.hashValue)
                .map((e) => e.toString(16).padStart(2, "0").toUpperCase())
                .join(":")}`;
            }
            static setupToString(e) {
              switch (e) {
                case a.DTLSSetup.ACTIVE:
                  return "active";
                case a.DTLSSetup.PASSIVE:
                  return "passive";
                case a.DTLSSetup.ACTPASS:
                  return "actpass";
              }
            }
            static directionToString(e) {
              switch (e) {
                case a.MediaDirection.SENDONLY:
                  return "sendonly";
                case a.MediaDirection.RECVONLY:
                  return "recvonly";
                case a.MediaDirection.INACTIVE:
                  return "inactive";
                default:
                  return "sendrecv";
              }
            }
            static reconstructCandidate(e) {
              const t =
                e.protocol === a.IceCandidateProtocol.UDP ? "udp" : "tcp";
              let i;
              switch (e.type) {
                case a.IceCandidateType.HOST:
                  i = "host";
                  break;
                case a.IceCandidateType.SRFLX:
                  i = "srflx";
                  break;
                case a.IceCandidateType.PRFLX:
                  i = "prflx";
                  break;
                case a.IceCandidateType.RELAY:
                  i = "relay";
              }
              const n = [
                e.foundation.toString(),
                e.component.toString(),
                t,
                e.priority.toString(),
                Array.from(e.ip)
                  .map((e) => (255 & e).toString())
                  .join("."),
                e.port.toString(),
                "typ",
                i,
              ];
              if (e.raddr.length > 0) {
                n.push("raddr");
                const t = Array.from(e.raddr)
                  .map((e) => (255 & e).toString())
                  .join(".");
                n.push(t);
              }
              if (
                (e.rport > 0 && (n.push("rport"), n.push(e.rport.toString())),
                "tcp" === t)
              ) {
                let t;
                switch (e.tcptype) {
                  case a.IceCandidateTcpType.ACTIVE:
                    t = "active";
                    break;
                  case a.IceCandidateTcpType.PASSIVE:
                    t = "passive";
                    break;
                  case a.IceCandidateTcpType.SO:
                    t = "so";
                }
                (n.push("tcptype"), n.push(t));
              }
              return n.join(" ");
            }
          }
          ((t.SdpConverter = r),
            (r.EXTMAP_ID_TO_URI = new Map([
              [1, "urn:ietf:params:rtp-hdrext:toffset"],
              [2, "http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time"],
              [3, "urn:3gpp:video-orientation"],
              [
                4,
                "http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01",
              ],
              [5, "http://www.webrtc.org/experiments/rtp-hdrext/playout-delay"],
              [
                6,
                "http://www.webrtc.org/experiments/rtp-hdrext/video-content-type",
              ],
              [7, "http://www.webrtc.org/experiments/rtp-hdrext/video-timing"],
              [8, "http://www.webrtc.org/experiments/rtp-hdrext/color-space"],
              [9, "urn:ietf:params:rtp-hdrext:sdes:mid"],
              [10, "urn:ietf:params:rtp-hdrext:sdes:rtp-stream-id"],
              [11, "urn:ietf:params:rtp-hdrext:sdes:repaired-rtp-stream-id"],
              [14, "urn:ietf:params:rtp-hdrext:ssrc-audio-level"],
              [15, "urn:ietf:params:rtp-hdrext:csrc-audio-level"],
            ])),
            (r.URI_TO_EXTMAP_ID = new Map(
              Array.from(r.EXTMAP_ID_TO_URI.entries()).map(([e, t]) => [t, e]),
            )),
            (r.RTCP_FEEDBACK_ID_TO_STRING = new Map([
              [1, "goog-remb"],
              [2, "transport-cc"],
              [3, "ccm fir"],
              [4, "nack"],
              [5, "nack pli"],
            ])),
            (r.RTCP_FEEDBACK_STRING_TO_ID = new Map(
              Array.from(r.RTCP_FEEDBACK_ID_TO_STRING.entries()).map(
                ([e, t]) => [t, e],
              ),
            )),
            (r.dynamicCodecNames = new Map()),
            (r.CODEC_NAME_TO_MAP_KEY = new Map([
              ["VP8/90000", 1],
              ["VP9/90000", 2],
              ["AV1/90000", 3],
              ["H264/90000", 4],
              ["H265/90000", 5],
              ["rtx/90000", 6],
              ["red/90000", 7],
              ["ulpfec/90000", 8],
              ["opus/48000/2", 9],
              ["red/48000/2", 10],
              ["G722/8000", 11],
              ["G722/8000/1", 11],
              ["PCMU/8000", 12],
              ["PCMA/8000", 13],
              ["CN/8000", 14],
              ["telephone-event/48000", 15],
              ["telephone-event/8000", 16],
              ["telephone-event/8000/1", 16],
              ["ILBC/8000", 17],
            ])),
            (r.MAP_KEY_TO_CODEC_NAME = new Map([
              [1, "VP8/90000"],
              [2, "VP9/90000"],
              [3, "AV1/90000"],
              [4, "H264/90000"],
              [5, "H265/90000"],
              [6, "rtx/90000"],
              [7, "red/90000"],
              [8, "ulpfec/90000"],
              [9, "opus/48000/2"],
              [10, "red/48000/2"],
              [11, "G722/8000"],
              [12, "PCMU/8000"],
              [13, "PCMA/8000"],
              [14, "CN/8000"],
              [15, "telephone-event/48000"],
              [16, "telephone-event/8000"],
              [17, "ILBC/8000"],
            ])));
        },
        799: (e, t) => {
          var i, n, a, l, r, s, o;
          (Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.IceCandidateTcpType =
              t.IceCandidateType =
              t.IceCandidateProtocol =
              t.MediaDirection =
              t.MediaType =
              t.DTLSSetup =
              t.HashFunction =
                void 0),
            (function (e) {
              ((e[(e.SHA256 = 0)] = "SHA256"),
                (e[(e.SHA1 = 1)] = "SHA1"),
                (e[(e.SHA384 = 2)] = "SHA384"),
                (e[(e.SHA512 = 3)] = "SHA512"),
                (e[(e.MD5 = 4)] = "MD5"));
            })(i || (t.HashFunction = i = {})),
            (function (e) {
              ((e[(e.ACTIVE = 0)] = "ACTIVE"),
                (e[(e.PASSIVE = 1)] = "PASSIVE"),
                (e[(e.ACTPASS = 2)] = "ACTPASS"));
            })(n || (t.DTLSSetup = n = {})),
            (function (e) {
              ((e[(e.AUDIO = 0)] = "AUDIO"),
                (e[(e.VIDEO = 1)] = "VIDEO"),
                (e[(e.MEDIA_TYPE_UNSPECIFIED = 2)] = "MEDIA_TYPE_UNSPECIFIED"));
            })(a || (t.MediaType = a = {})),
            (function (e) {
              ((e[(e.SENDRECV = 0)] = "SENDRECV"),
                (e[(e.SENDONLY = 1)] = "SENDONLY"),
                (e[(e.RECVONLY = 2)] = "RECVONLY"),
                (e[(e.INACTIVE = 3)] = "INACTIVE"));
            })(l || (t.MediaDirection = l = {})),
            (function (e) {
              ((e[(e.UDP = 0)] = "UDP"), (e[(e.TCP = 1)] = "TCP"));
            })(r || (t.IceCandidateProtocol = r = {})),
            (function (e) {
              ((e[(e.HOST = 0)] = "HOST"),
                (e[(e.SRFLX = 1)] = "SRFLX"),
                (e[(e.PRFLX = 2)] = "PRFLX"),
                (e[(e.RELAY = 3)] = "RELAY"));
            })(s || (t.IceCandidateType = s = {})),
            (function (e) {
              ((e[(e.ACTIVE = 0)] = "ACTIVE"),
                (e[(e.PASSIVE = 1)] = "PASSIVE"),
                (e[(e.SO = 2)] = "SO"));
            })(o || (t.IceCandidateTcpType = o = {})));
        },
        828: (e, t, i) => {
          (Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.QueuedSignal = void 0));
          const n = i(795),
            a = i(429);
          class l {
            constructor(
              e,
              t,
              i = n.SignalQueueStrategy.getSignalPriority(e),
              l = Date.now(),
              r = 0,
              s = (0, a.v4)(),
            ) {
              ((this.signal = e),
                (this.callback = t),
                (this.priority = i),
                (this.timestamp = l),
                (this.requeueCount = r),
                (this.uniqueKey = s));
            }
            get callId() {
              return this.signal.callId;
            }
            compareTo(e) {
              const t = e.priority - this.priority;
              return 0 !== t ? t : this.timestamp - e.timestamp;
            }
            equals(e) {
              return e instanceof l && e.signal === this.signal;
            }
            toString() {
              return `QueuedSignal(signal=${JSON.stringify(this.signal)}, timestamp=${this.timestamp}, priority=${this.priority}, requeueCount=${this.requeueCount}, uniqueKey=${this.uniqueKey})`;
            }
          }
          t.QueuedSignal = l;
        },
        795: (e, t, i) => {
          (Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.SignalQueueStrategy = t.SignalProcessingStrategy = void 0));
          const n = i(578),
            a = i(586);
          var l;
          !(function (e) {
            ((e[(e.SEQUENTIAL = 0)] = "SEQUENTIAL"),
              (e[(e.IMMEDIATE = 1)] = "IMMEDIATE"));
          })(l || (t.SignalProcessingStrategy = l = {}));
          class r {
            static getProcessingStrategy(e) {
              return this.SEQUENTIAL_SIGNALS.has(e)
                ? l.SEQUENTIAL
                : l.IMMEDIATE;
            }
            static isSequentialSignal(e) {
              return this.getProcessingStrategy(e) === l.SEQUENTIAL;
            }
            static isImmediateSignal(e) {
              return this.getProcessingStrategy(e) === l.IMMEDIATE;
            }
            static getSignalPriorityValue(e, t) {
              switch (e) {
                case n.SignalEvent.JOIN:
                  return 10;
                case n.SignalEvent.LEAVE:
                case n.SignalEvent.DECLINE:
                  return 9;
                case n.SignalEvent.MEDIA_CONNECTED:
                  return 8;
                case n.SignalEvent.OFFER:
                case n.SignalEvent.ANSWER:
                case n.SignalEvent.CONNECT:
                case n.SignalEvent.ICE:
                  return 7;
                case n.SignalEvent.KICK:
                case n.SignalEvent.INVITE:
                case n.SignalEvent.RINGING:
                case n.SignalEvent.INFO:
                case n.SignalEvent.UPDATE:
                case n.SignalEvent.GET_CALL:
                case n.SignalEvent.SWITCH_MEDIA_FLOW:
                  return 6;
                case n.SignalEvent.MUTE:
                case n.SignalEvent.UNMUTE:
                case n.SignalEvent.VIDEO_ON:
                case n.SignalEvent.VIDEO_OFF:
                case n.SignalEvent.HOLD:
                case n.SignalEvent.UNHOLD:
                case n.SignalEvent.SCREEN_SHARE_ON:
                case n.SignalEvent.SCREEN_SHARE_OFF:
                  return 5;
                case n.SignalEvent.ERROR:
                case n.SignalEvent.SUCCESS:
                case n.SignalEvent.CLOSE:
                case n.SignalEvent.NO_ANSWER:
                  throw new Error(`SignalEvent ${e} should not be in queue`);
                default:
                  return 0;
              }
            }
            static getSignalPriority(e) {
              if ("number" != typeof e.event)
                throw new Error(
                  `Signal event is not a number for signal: ${JSON.stringify(e)}`,
                );
              return this.getSignalPriorityValue(e.event, e);
            }
            static getSignalLevel(e) {
              switch (e.event) {
                case n.SignalEvent.JOIN:
                case n.SignalEvent.LEAVE:
                case n.SignalEvent.DECLINE:
                  return a.SignalLevel.GlobalBlocking;
                case n.SignalEvent.OFFER:
                case n.SignalEvent.ANSWER:
                case n.SignalEvent.ICE:
                case n.SignalEvent.CONNECT:
                  return a.SignalLevel.ParticipantLevel;
                default:
                  return a.SignalLevel.Immediate;
              }
            }
          }
          ((t.SignalQueueStrategy = r),
            (r.SEQUENTIAL_SIGNALS = new Set([
              n.SignalEvent.JOIN,
              n.SignalEvent.LEAVE,
              n.SignalEvent.DECLINE,
              n.SignalEvent.OFFER,
              n.SignalEvent.ANSWER,
              n.SignalEvent.CONNECT,
            ])));
        },
        586: function (e, t, i) {
          var n =
            (this && this.__awaiter) ||
            function (e, t, i, n) {
              return new (i || (i = Promise))(function (a, l) {
                function r(e) {
                  try {
                    o(n.next(e));
                  } catch (e) {
                    l(e);
                  }
                }
                function s(e) {
                  try {
                    o(n.throw(e));
                  } catch (e) {
                    l(e);
                  }
                }
                function o(e) {
                  var t;
                  e.done
                    ? a(e.value)
                    : ((t = e.value),
                      t instanceof i
                        ? t
                        : new i(function (e) {
                            e(t);
                          })).then(r, s);
                }
                o((n = n.apply(e, t || [])).next());
              });
            };
          (Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.SignalingQueue = t.SignalLevel = void 0));
          const a = i(795),
            l = (0, i(645).createLogger)("SignalingQueue");
          var r;
          (!(function (e) {
            ((e[(e.GlobalBlocking = 0)] = "GlobalBlocking"),
              (e[(e.ParticipantLevel = 1)] = "ParticipantLevel"),
              (e[(e.Immediate = 2)] = "Immediate"));
          })(r || (t.SignalLevel = r = {})),
            (t.SignalingQueue = class {
              constructor(e, t, i) {
                ((this.id = e),
                  (this.isTransportConnected = t),
                  (this.sender = i),
                  (this.globalBlockingSignals = []),
                  (this.immediateSignals = []),
                  (this.participantSignals = new Map()),
                  (this.processingSignalJobs = new Map()),
                  (this.participantJobs = new Map()),
                  (this.sentSignals = new Set()));
              }
              getSignalKey(e, t) {
                return `${t}_${e.event}_${e.callId}_${e.sessionId || ""}`;
              }
              addSignalToQueue(e) {
                const t = this.getSignalKey(e.signal, e.uniqueKey);
                if (this.sentSignals.has(t))
                  return void l.info(
                    `[38] [CallId: ${e.signal.callId}] Signal already sent, skipping: ${e.toString()}`,
                  );
                const i = a.SignalQueueStrategy.getSignalLevel(e.signal);
                switch (i) {
                  case r.GlobalBlocking:
                    this.globalBlockingSignals.push(e);
                    break;
                  case r.ParticipantLevel:
                    const t = e.signal.to || "";
                    (this.participantSignals.has(t) ||
                      this.participantSignals.set(t, []),
                      this.participantSignals.get(t).push(e));
                    break;
                  case r.Immediate:
                    this.immediateSignals.push(e);
                }
                (l.info(
                  `[61] [CallId: ${e.signal.callId}] Add signal to queue ===> level: ${i}, signal: ${JSON.stringify({ signal: e.signal, uniqueKey: e.uniqueKey })}`,
                ),
                  this.invalidateToSendSignalsIfNeeded());
              }
              removeSignalFromQueue(e) {
                const t = this.getSignalKey(e.signal, e.uniqueKey);
                this.sentSignals.delete(t);
              }
              invalidateToSendSignalsIfNeeded() {
                this.isTransportConnected()
                  ? this.globalBlockingSignals.length > 0
                    ? this.sendGlobalBlockingSignals()
                    : (this.sendParticipantSignals(),
                      this.sendImmediateLevelSignals())
                  : l.info(
                      `[75] [CallId: ${this.id}] Connection is not established, skipping signal processing`,
                    );
              }
              triggerSignalProcessing() {
                this.invalidateToSendSignalsIfNeeded();
              }
              sendGlobalBlockingSignals() {
                return n(this, void 0, void 0, function* () {
                  if (!this.processingSignalJobs.get(r.GlobalBlocking)) {
                    this.processingSignalJobs.set(r.GlobalBlocking, !0);
                    try {
                      for (; this.isTransportConnected(); ) {
                        const e = this.globalBlockingSignals.shift();
                        if (!e) break;
                        const t = this.getSignalKey(e.signal, e.uniqueKey);
                        this.sentSignals.has(t)
                          ? l.info(
                              `[107] [CallId: ${this.id}] Global blocking signal already sent, skipping: ${e.toString()}`,
                            )
                          : (l.info(
                              `[111] [CallId: ${this.id}] Sending ${r.GlobalBlocking} level signal: ${e.toString()}`,
                            ),
                            yield this.sendSignal(e),
                            this.sentSignals.add(t));
                      }
                    } finally {
                      (this.processingSignalJobs.delete(r.GlobalBlocking),
                        0 === this.globalBlockingSignals.length &&
                          (this.sendParticipantSignals(),
                          this.sendImmediateLevelSignals()));
                    }
                  }
                });
              }
              sendImmediateLevelSignals() {
                return n(this, void 0, void 0, function* () {
                  if (
                    !(
                      this.globalBlockingSignals.length > 0 ||
                      this.processingSignalJobs.get(r.Immediate)
                    )
                  ) {
                    this.processingSignalJobs.set(r.Immediate, !0);
                    try {
                      for (
                        ;
                        this.isTransportConnected() &&
                        0 === this.globalBlockingSignals.length;
                      ) {
                        const e = this.immediateSignals.shift();
                        if (!e) break;
                        const t = this.getSignalKey(e.signal, e.uniqueKey);
                        this.sentSignals.has(t)
                          ? l.info(
                              `[145] [CallId: ${this.id}] Immediate signal already sent, skipping: ${e.toString()}`,
                            )
                          : (l.info(
                              `[148] [CallId: ${this.id}] Sending ${r.Immediate} level signal: ${e.toString()}`,
                            ),
                            yield this.sendSignal(e),
                            this.sentSignals.add(t));
                      }
                    } finally {
                      this.processingSignalJobs.delete(r.Immediate);
                    }
                  }
                });
              }
              sendParticipantSignals() {
                if (!(this.globalBlockingSignals.length > 0))
                  for (const [e, t] of this.participantSignals.entries())
                    t.length > 0 && this.sendParticipantSignal(e, t);
              }
              sendParticipantSignal(e, t) {
                return n(this, void 0, void 0, function* () {
                  if (!this.participantJobs.get(e)) {
                    this.participantJobs.set(e, !0);
                    try {
                      for (
                        ;
                        this.isTransportConnected() &&
                        0 === this.globalBlockingSignals.length;
                      ) {
                        const i = t.shift();
                        if (!i) break;
                        const n = this.getSignalKey(i.signal, i.uniqueKey);
                        this.sentSignals.has(n)
                          ? l.info(
                              `[185] [CallId: ${this.id}] Participant signal already sent, skipping: ${i.toString()}`,
                            )
                          : (l.info(
                              `[188] [CallId: ${this.id}] Sending ${r.ParticipantLevel} level signal for identity ${e}: ${i.toString()}`,
                            ),
                            yield this.sendSignal(i),
                            this.sentSignals.add(n));
                      }
                    } finally {
                      (this.participantJobs.delete(e),
                        0 === t.length && this.participantSignals.delete(e));
                    }
                  }
                });
              }
              sendSignal(e) {
                return n(this, void 0, void 0, function* () {
                  a.SignalQueueStrategy.getProcessingStrategy(
                    e.signal.event,
                  ) === a.SignalProcessingStrategy.SEQUENTIAL
                    ? yield this.sender(e)
                    : this.sender(e).catch((e) => {
                        l.error(
                          `[209] [CallId: ${this.id}] Error sending signal: ${e}`,
                        );
                      });
                });
              }
              clearParticipantSignals(e) {
                (this.participantSignals.delete(e),
                  this.participantJobs.delete(e),
                  l.info(
                    `[213] [CallId: ${this.id}] Cleared participant signals for identity: ${e}, queueId: ${this.id}`,
                  ));
              }
              clearCallSignals() {
                ((this.globalBlockingSignals = []),
                  (this.immediateSignals = []),
                  this.participantSignals.clear(),
                  this.processingSignalJobs.clear(),
                  this.participantJobs.clear(),
                  this.sentSignals.clear(),
                  l.info(
                    `[227] [CallId: ${this.id}] Cleared all signals for queueId: ${this.id}`,
                  ));
              }
              getGlobalBlockingSignals() {
                return this.globalBlockingSignals;
              }
            }));
        },
        786: function (e, t, i) {
          var n =
            (this && this.__awaiter) ||
            function (e, t, i, n) {
              return new (i || (i = Promise))(function (a, l) {
                function r(e) {
                  try {
                    o(n.next(e));
                  } catch (e) {
                    l(e);
                  }
                }
                function s(e) {
                  try {
                    o(n.throw(e));
                  } catch (e) {
                    l(e);
                  }
                }
                function o(e) {
                  var t;
                  e.done
                    ? a(e.value)
                    : ((t = e.value),
                      t instanceof i
                        ? t
                        : new i(function (e) {
                            e(t);
                          })).then(r, s);
                }
                o((n = n.apply(e, t || [])).next());
              });
            };
          (Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.Signaling = void 0));
          const a = i(578),
            l = i(645),
            r = i(828),
            s = i(586),
            o = i(228),
            c = i(65),
            d = i(429),
            p = (0, l.createLogger)("Signaling");
          class u {
            constructor(e, t) {
              ((this.signalingQueues = new Map()), (this.chatClient = e));
              const i = new this.chatClient.ChannelListener();
              ((i.onSignal = (e) => {
                t(e);
              }),
                this.chatClient.addChannelListener("call_listeners", i));
            }
            calculateRetryDelay(e) {
              return Math.min(u.BASE_DELAY_MS * Math.pow(2, e), u.MAX_DELAY_MS);
            }
            handleRetry(e, t, i, a) {
              var l;
              return n(this, void 0, void 0, function* () {
                if (t >= u.MAX_RETRIES)
                  throw (
                    p.error(
                      `[45] [CallId: ${e.signal.callId}] Max retries exceeded for signal: ${JSON.stringify(e.signal)}`,
                      { color: "red" },
                    ),
                    i
                  );
                i instanceof c.SceytCallException &&
                  !i.isResendable &&
                  (p.error(
                    `[49] [CallId: ${e.signal.callId}] Signal sending failed with non-resendable exception: ${i.message}`,
                    { color: "red" },
                  ),
                  null === (l = e.callback) || void 0 === l || l.call(e, i),
                  a.removeSignalFromQueue(e));
                const n = this.calculateRetryDelay(t);
                (p.error(
                  `[53] [CallId: ${e.signal.callId}] Sending signal failed with error: ${i.message}, but ChatClient is connected. Retrying in ${n}ms (attempt ${t + 1}/${u.MAX_RETRIES})`,
                  { color: "red" },
                ),
                  yield new Promise((e) => setTimeout(e, n)));
                try {
                  const t = yield this.sendSignalSuspended(e);
                  return (
                    p.info(
                      `[64] [CallId: ${e.signal.callId}] Retry sending signal success: ${JSON.stringify(t)}`,
                    ),
                    t
                  );
                } catch (i) {
                  return (
                    p.error(
                      `[67] [CallId: ${e.signal.callId}] Retry sending signal failed: ${i instanceof Error ? i.message : String(i)}`,
                    ),
                    this.handleRetry(
                      e,
                      t + 1,
                      i instanceof Error ? i : new Error(String(i)),
                      a,
                    )
                  );
                }
              });
            }
            sendSignalSuspended(e) {
              return n(this, void 0, void 0, function* () {
                try {
                  p.info(
                    `[78] [CallId: ${e.signal.callId}] Sending signal to chat client: version: 132 ${JSON.stringify(e.signal)}`,
                  );
                  const t = yield this.chatClient.sendSignal(e.signal, 132);
                  if (null == t ? void 0 : t.error)
                    throw (0, o.toCallException)(t.error);
                  return (0, o.handleAck)(t);
                } catch (e) {
                  throw (0, o.toCallException)(e);
                }
              });
            }
            sendSignalMessage(e, t, i) {
              p.info(
                `[92] [CallId: ${e.callId}] Sending signal message request: ${a.SignalEvent[e.event]} uniqueKey: ${(0, d.v4)()} ${JSON.stringify(e)}`,
                { color: "yellow" },
              );
              const l = Object.assign(
                  Object.assign(
                    Object.assign(
                      Object.assign(
                        Object.assign(
                          Object.assign(
                            Object.assign(
                              { mediaFlow: e.mediaFlow, callId: e.callId },
                              e.sessionId && { sessionId: e.sessionId },
                            ),
                            { event: e.event },
                          ),
                          e.sessionData && { sessionData: e.sessionData },
                        ),
                        e.to && { to: e.to },
                      ),
                      { participants: e.participants ? e.participants : [] },
                    ),
                    e.ice && { ice: e.ice },
                  ),
                  e.metadata && { metadata: e.metadata },
                ),
                o = i || e.callId;
              let g = this.signalingQueues.get(o);
              (g ||
                ((g = new s.SignalingQueue(
                  o,
                  () => "Connected" === this.chatClient.connectionState,
                  (e) =>
                    n(this, void 0, void 0, function* () {
                      var t, i, n, l, s;
                      try {
                        const l = yield this.sendSignalSuspended(e);
                        if (
                          (p.info(
                            `[115] [CallId: ${e.signal.callId || "GLOBAL_LOGS"}] Sent signal message response: ${a.SignalEvent[e.signal.event]} uniqueKey: ${e.uniqueKey} ${JSON.stringify(l)}`,
                            { color: "magenta" },
                          ),
                          (null == l ? void 0 : l.event) ===
                            a.SignalEvent.ERROR)
                        )
                          throw new c.SceytCallException(
                            (null === (t = null == l ? void 0 : l.error) ||
                            void 0 === t
                              ? void 0
                              : t.message) || "Unknown error",
                            (null === (i = null == l ? void 0 : l.error) ||
                            void 0 === i
                              ? void 0
                              : i.code) || 0,
                          );
                        return (
                          null === (n = e.callback) ||
                            void 0 === n ||
                            n.call(e, l),
                          null == g || g.removeSignalFromQueue(e),
                          l
                        );
                      } catch (t) {
                        if (
                          (p.error(
                            `[125] [CallId: ${e.signal.callId || "GLOBAL_LOGS"}] Signal message error: ${a.SignalEvent[e.signal.event]} uniqueKey: ${e.uniqueKey} error: ${t instanceof Error ? t.message : String(t)}, resendable: ${t instanceof c.SceytCallException && t.isResendable}`,
                            { color: "red" },
                          ),
                          t instanceof c.SceytCallException && t.isResendable)
                        ) {
                          const i = e.requeueCount;
                          i < u.REQUEUE_LIMIT
                            ? null == g ||
                              g.addSignalToQueue(
                                new r.QueuedSignal(
                                  e.signal,
                                  e.callback,
                                  e.priority,
                                  e.timestamp,
                                  i + 1,
                                  (0, d.v4)(),
                                ),
                              )
                            : (p.error(
                                `[140] [CallId: ${e.signal.callId || "GLOBAL_LOGS"}] Max requeue limit reached for signal: ${JSON.stringify(e.signal)}, will not requeue again. uniqueKey: ${e.uniqueKey}`,
                                { color: "red" },
                              ),
                              null === (l = e.callback) ||
                                void 0 === l ||
                                l.call(e, t),
                              null == g || g.removeSignalFromQueue(e));
                        }
                        const i =
                          t instanceof c.SceytCallException
                            ? t
                            : new Error(
                                t instanceof Error ? t.message : String(t),
                              );
                        (null === (s = e.callback) ||
                          void 0 === s ||
                          s.call(e, i),
                          null == g || g.removeSignalFromQueue(e));
                      }
                    }),
                )),
                this.signalingQueues.set(o, g)),
                g.addSignalToQueue(
                  new r.QueuedSignal(l, t, 0, 0, 0, (0, d.v4)()),
                ));
            }
            clearCallSignals(e) {
              const t = this.signalingQueues.get(e);
              t && (t.clearCallSignals(), this.signalingQueues.delete(e));
            }
            clearParticipantSignals(e, t) {
              const i = this.signalingQueues.get(e);
              i && i.clearParticipantSignals(t);
            }
            cancelJoinIfPossible(e) {
              const t = this.signalingQueues.get(e);
              return (
                !!t &&
                !!t
                  .getGlobalBlockingSignals()
                  .find((e) => e.signal.event == a.SignalEvent.JOIN) &&
                (t.clearCallSignals(), !0)
              );
            }
          }
          ((t.Signaling = u),
            (u.REQUEUE_LIMIT = 10),
            (u.MAX_RETRIES = 10),
            (u.BASE_DELAY_MS = 1e3),
            (u.MAX_DELAY_MS = 8e3));
        },
        740: (e, t) => {
          (Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.VideoTrack = void 0),
            (t.VideoTrack = class {
              constructor(e) {
                ((this._enabled = !0), (this.id = e.id), (this.videoTrack = e));
              }
              set enabled(e) {
                ((this._enabled = e), (this.videoTrack.enabled = e));
              }
              get enabled() {
                return this._enabled;
              }
            }));
        },
        546: function (e, t, i) {
          var n =
            (this && this.__awaiter) ||
            function (e, t, i, n) {
              return new (i || (i = Promise))(function (a, l) {
                function r(e) {
                  try {
                    o(n.next(e));
                  } catch (e) {
                    l(e);
                  }
                }
                function s(e) {
                  try {
                    o(n.throw(e));
                  } catch (e) {
                    l(e);
                  }
                }
                function o(e) {
                  var t;
                  e.done
                    ? a(e.value)
                    : ((t = e.value),
                      t instanceof i
                        ? t
                        : new i(function (e) {
                            e(t);
                          })).then(r, s);
                }
                o((n = n.apply(e, t || [])).next());
              });
            };
          (Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.WebRTCClient = void 0));
          const a = i(578),
            l = i(645),
            r = i(19),
            s = i(680),
            o = (0, l.createLogger)("WebRTCClient");
          t.WebRTCClient = class {
            constructor(e, t) {
              ((this.listeners = {}),
                (this.sessionId = null),
                (this.version = null),
                (this.iceQueueMap = {}),
                (this.configuration = t),
                (this.peerConnection = new RTCPeerConnection(
                  this.configuration,
                )),
                (this.callId = e));
            }
            setSessionId(e) {
              this.sessionId = e;
            }
            getSessionId() {
              return this.sessionId || "";
            }
            setVersion(e) {
              this.version = e;
            }
            getVersion() {
              return this.version || "";
            }
            setListeners(e) {
              (o.info(
                `[18] [CallId: ${this.callId}] setListeners in webrtcClient: listeners`,
                { color: "blue" },
              ),
                (this.listeners = e));
            }
            setConfiguration(e) {
              (o.info(
                `[21] [CallId: ${this.callId}] setConfiguration in webrtcClient: configuration: ${e}`,
                { color: "blue" },
              ),
                (this.configuration = e));
            }
            getPreferredAudioCodecs(e) {
              const t = RTCRtpReceiver.getCapabilities("audio");
              return t
                ? t.codecs.filter((t) => {
                    const i = t.mimeType.split("/")[1].toLowerCase();
                    return e === a.MediaFlow.S2W
                      ? r.CODEC_NAME_TO_AUDIO_CODEC_S2W.includes(i)
                      : r.CODEC_NAME_TO_AUDIO_CODEC.includes(i);
                  })
                : [];
            }
            getPreferredVideoCodecs() {
              const e = RTCRtpSender.getCapabilities("video");
              if (!e) return [];
              const t = [];
              return (
                r.CODEC_NAME_TO_VIDEO_CODEC.forEach((i) => {
                  const n = e.codecs.find(
                    (e) =>
                      e.mimeType.split("/")[1].toLowerCase() ===
                      i.toLowerCase(),
                  );
                  n && t.push(n);
                }),
                t
              );
            }
            setPreferredCodecs(e, t, i) {
              if ("video" === t) {
                o.info(
                  `[74] [CallId: ${this.callId}] setPreferredCodecs: video, mediaFlow: ${e}`,
                  { color: "blue" },
                );
                const t = this.getPreferredVideoCodecs(),
                  n = [];
                (t.forEach((e) => {
                  n.push({
                    mimeType: e.mimeType,
                    clockRate: e.clockRate,
                    sdpFmtpLine: e.sdpFmtpLine,
                    channels: e.channels,
                  });
                }),
                  i.setCodecPreferences(n));
              } else if ("audio" === t) {
                o.info(
                  `[88] [CallId: ${this.callId}] setPreferredCodecs: audio, mediaFlow: ${e}`,
                  { color: "blue" },
                );
                const t = this.getPreferredAudioCodecs(e),
                  n = [];
                (t.forEach((e) => {
                  n.push({
                    mimeType: e.mimeType,
                    clockRate: e.clockRate,
                    sdpFmtpLine: e.sdpFmtpLine || "",
                    channels: e.channels || void 0,
                  });
                }),
                  i.setCodecPreferences(n));
              }
            }
            addTransceiverToPeerConnection(e, t) {
              (o.info(
                `[56] [CallId: ${this.callId}] addTransceiverToPeerConnection in webrtcClient: track: ${null == e ? void 0 : e.kind}`,
                { color: "blue" },
              ),
                this.peerConnection.addTransceiver(e, {
                  direction: "sendrecv",
                }));
              const i = this.peerConnection.getTransceivers().find((t) => {
                var i;
                return (
                  (null === (i = t.receiver.track) || void 0 === i
                    ? void 0
                    : i.kind) === (null == e ? void 0 : e.kind)
                );
              });
              if (i && "video" === (null == e ? void 0 : e.kind)) {
                this.setPreferredCodecs(t, "video", i);
                try {
                  const e = i.sender.getParameters();
                  e.encodings &&
                    e.encodings.length > 0 &&
                    (e.encodings.forEach((e) => {
                      e.maxBitrate = 5e5;
                    }),
                    i.sender.setParameters(e),
                    o.info(
                      `[57] [CallId: ${this.callId}] addTransceiverToPeerConnection: Set video max bitrate to 500 kbps`,
                      { color: "blue" },
                    ));
                } catch (e) {
                  o.warn(
                    `[58] [CallId: ${this.callId}] addTransceiverToPeerConnection: Failed to set video bitrate: ${e instanceof Error ? e.message : JSON.stringify(e)}`,
                    { color: "yellow" },
                  );
                }
              } else
                i &&
                  "audio" === (null == e ? void 0 : e.kind) &&
                  this.setPreferredCodecs(t, "audio", i);
            }
            setStreamsToTransceiver(e) {
              var t, i;
              return n(this, void 0, void 0, function* () {
                o.info(
                  `[61] [CallId: ${this.callId}] setStreamsToTransceiver in webrtcClient: track: ${null == e ? void 0 : e.kind}`,
                  { color: "blue" },
                );
                const n = this.peerConnection.getTransceivers();
                o.info(
                  `[62] [CallId: ${this.callId}] setStreamsToTransceiver: transceivers: ${n.length}`,
                  { color: "blue" },
                );
                const a = null == e ? void 0 : e.kind;
                let l = n.find((e) => {
                  var t, i;
                  const n =
                      null === (t = e.receiver.track) || void 0 === t
                        ? void 0
                        : t.kind,
                    l =
                      null === (i = e.sender.track) || void 0 === i
                        ? void 0
                        : i.kind;
                  return n === a || l === a;
                });
                if (
                  (o.info(
                    `[63] [CallId: ${this.callId}] setStreamsToTransceiver: transceiver found: ${!!l}, receiver track: ${null === (t = null == l ? void 0 : l.receiver.track) || void 0 === t ? void 0 : t.kind}, sender track: ${null === (i = null == l ? void 0 : l.sender.track) || void 0 === i ? void 0 : i.kind}, current direction: ${null == l ? void 0 : l.direction}, mid: ${null == l ? void 0 : l.mid}`,
                    { color: "blue" },
                  ),
                  l)
                ) {
                  if (null !== l.sender.track)
                    return void o.info(
                      `[64] [CallId: ${this.callId}] setStreamsToTransceiver: Track already attached, skipping to avoid renegotiation`,
                      { color: "blue" },
                    );
                  (e && (e.enabled = !0),
                    (l.direction = "sendrecv"),
                    yield l.sender.replaceTrack(e));
                  const t = l.direction,
                    i = l.sender.track,
                    n = i ? i.kind : "null";
                  (o.info(
                    `[65] [CallId: ${this.callId}] setStreamsToTransceiver: Attached local ${a} track to transceiver, direction: ${t}, sender track: ${n}, track enabled: ${null == e ? void 0 : e.enabled}, track id: ${null == e ? void 0 : e.id}`,
                    { color: "blue" },
                  ),
                    i ||
                      o.error(
                        `[66] [CallId: ${this.callId}] setStreamsToTransceiver: Failed to attach ${a} track - sender track is still null after replaceTrack`,
                        { color: "red" },
                      ));
                } else {
                  const e = n.map((e) => {
                    var t, i;
                    return {
                      mid: e.mid,
                      receiverKind:
                        (null === (t = e.receiver.track) || void 0 === t
                          ? void 0
                          : t.kind) || "null",
                      senderKind:
                        (null === (i = e.sender.track) || void 0 === i
                          ? void 0
                          : i.kind) || "null",
                      direction: e.direction,
                    };
                  });
                  o.warn(
                    `[67] [CallId: ${this.callId}] setStreamsToTransceiver: No transceiver found for track kind: ${a}. Available transceivers: ${JSON.stringify(e)}`,
                    { color: "yellow" },
                  );
                }
              });
            }
            enableVideoOnPeerConnection(e, t, i = !1) {
              (o.info(
                `[27] [CallId: ${this.callId}] enableVideoOnPeerConnection in webrtcClient: enable: ${e}, kind: ${null == t ? void 0 : t.kind}`,
                { color: "blue" },
              ),
                this.peerConnection.getTransceivers().forEach((a) =>
                  n(this, void 0, void 0, function* () {
                    a.sender.track &&
                      "video" === a.sender.track.kind &&
                      (t
                        ? ((t.enabled = e), yield a.sender.replaceTrack(t))
                        : (a.sender.track.enabled = e));
                    const n = a.sender.getParameters();
                    n.encodings &&
                      n.encodings.length > 0 &&
                      (n.encodings.forEach((e) => {
                        e.maxBitrate = i ? 75e4 : 5e5;
                      }),
                      a.sender.setParameters(n),
                      o.info(
                        `[184] [CallId: ${this.callId}] enableVideoOnPeerConnection: Set video max bitrate to ${i ? 75e4 : 5e5} kbps`,
                        { color: "blue" },
                      ));
                  }),
                ));
            }
            enableAudioOnPeerConnection(e, t) {
              (o.info(
                `[33] [CallId: ${this.callId}] enableAudioOnPeerConnection in webrtcClient: mute: ${e}, kind: ${null == t ? void 0 : t.kind}`,
                { color: "blue" },
              ),
                this.peerConnection.getTransceivers().forEach((i) =>
                  n(this, void 0, void 0, function* () {
                    i.sender.track &&
                      "audio" === i.sender.track.kind &&
                      (t
                        ? ((t.enabled = !e), yield i.sender.replaceTrack(t))
                        : (i.sender.track.enabled = !e));
                  }),
                ));
            }
            createOffer(e, t, i) {
              return n(this, void 0, void 0, function* () {
                try {
                  o.info(
                    `[36] [CallId: ${this.callId}] createOffer in webrtcClient`,
                    { color: "blue" },
                  );
                  const n = yield this.peerConnection.createOffer({
                      iceRestart: !0,
                      offerToReceiveAudio: !0,
                      offerToReceiveVideo: !0,
                    }),
                    a = (0, s.toSessionData)(
                      { sdp: n, sessionId: e, versionId: t },
                      i,
                    ),
                    l = (0, s.toSessionDescription)(a, "offer");
                  return l
                    ? (yield this.setLocalDescription(l), a)
                    : (o.error(
                        `[76] [CallId: ${this.callId}] createOffer in webrtcClient failed to convert session data to session description`,
                        { color: "red" },
                      ),
                      !1);
                } catch (e) {
                  return (
                    o.error(
                      `[37] [CallId: ${this.callId}] createOffer in webrtcClient failed: ${e instanceof Error ? e.message : JSON.stringify(e)}`,
                      { color: "red" },
                    ),
                    !1
                  );
                }
              });
            }
            createAnswer(e, t, i) {
              return n(this, void 0, void 0, function* () {
                try {
                  o.info(
                    `[75] [CallId: ${this.callId}] createAnswer in webrtcClient`,
                    { color: "blue" },
                  );
                  const n = yield this.peerConnection.createAnswer(),
                    a = (0, s.toSessionData)(
                      { sdp: n, sessionId: e, versionId: t },
                      i,
                    ),
                    l = (0, s.toSessionDescription)(a, "answer");
                  return l
                    ? (yield this.setLocalDescription(l), a)
                    : (o.error(
                        `[76] [CallId: ${this.callId}] createAnswer in webrtcClient failed to convert session data to session description`,
                        { color: "red" },
                      ),
                      !1);
                } catch (e) {
                  return (
                    o.error(
                      `[70] [CallId: ${this.callId}] createAnswer in webrtcClient failed: ${e instanceof Error ? e.message : JSON.stringify(e)}`,
                      { color: "red" },
                    ),
                    !1
                  );
                }
              });
            }
            setLocalDescription(e) {
              var t;
              return (
                o.info(
                  `[44] [CallId: ${this.callId}] setLocalDescription in webrtcClient: sdp sliced 50: ${null === (t = null == e ? void 0 : e.sdp) || void 0 === t ? void 0 : t.slice(0, 50)}...`,
                  { color: "blue" },
                ),
                this.peerConnection.setLocalDescription(e)
              );
            }
            setRemoteDescription(e) {
              var t;
              return (
                o.info(
                  `[48] [CallId: ${this.callId}] setRemoteDescription in webrtcClient: sdp sliced 50: ${null === (t = e.sdp) || void 0 === t ? void 0 : t.slice(0, 50)}...`,
                  { color: "blue" },
                ),
                this.peerConnection.setRemoteDescription(e)
              );
            }
            getLocalSdpUfrag() {
              var e;
              const t = (
                (null === (e = this.peerConnection.localDescription) ||
                void 0 === e
                  ? void 0
                  : e.sdp) || ""
              ).match(/a=ice-ufrag:(\S+)/);
              return t ? t[1] : null;
            }
            getRemoteSdpUfrag() {
              var e;
              const t = (
                (null === (e = this.peerConnection.remoteDescription) ||
                void 0 === e
                  ? void 0
                  : e.sdp) || ""
              ).match(/a=ice-ufrag:(\S+)/);
              return t ? t[1] : null;
            }
            getIceCandidateUfrag(e) {
              const t = e.match(/ufrag\s+(\S+)/);
              return t ? t[1] : null;
            }
            isUfragEqualsSdpUfrag(e) {
              return {
                equals:
                  this.getIceCandidateUfrag(e) === this.getRemoteSdpUfrag(),
                ufrag: this.getIceCandidateUfrag(e),
                sdpUfrag: this.getRemoteSdpUfrag(),
              };
            }
            addIceCandidate(e, t) {
              if (
                (o.info(
                  `[52] [CallId: ${this.callId}] addIceCandidate in webrtcClient: candidate: ${e.candidate}`,
                  { color: "blue" },
                ),
                e.candidate)
              ) {
                const i = this.isUfragEqualsSdpUfrag(e.candidate);
                if (!i.equals)
                  return (
                    this.iceQueueMap[t] || (this.iceQueueMap[t] = {}),
                    void (
                      i.ufrag &&
                      (this.iceQueueMap[t][i.ufrag] ||
                        (this.iceQueueMap[t][i.ufrag] = []),
                      this.iceQueueMap[t][i.ufrag].push(e))
                    )
                  );
              }
              return this.peerConnection.addIceCandidate(e);
            }
            addEventListener(e, t) {
              this.peerConnection.addEventListener(e, t);
            }
            removeEventListener(e, t) {
              this.peerConnection.removeEventListener(e, t);
            }
            close() {
              (o.info(`[56] [CallId: ${this.callId}] close in webrtcClient`, {
                color: "blue",
              }),
                this.peerConnection.close());
            }
            getConnectionStats() {
              return n(this, void 0, void 0, function* () {
                return yield this.peerConnection.getStats();
              });
            }
          };
        },
        297: (e, t) => {
          (Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.TypedEventEmitter = void 0),
            (t.TypedEventEmitter = class {
              constructor() {
                this.listeners = new Map();
              }
              on(e, t) {
                return (
                  this.listeners.has(e) || this.listeners.set(e, new Set()),
                  this.listeners.get(e).add(t),
                  () => {
                    var i;
                    null === (i = this.listeners.get(e)) ||
                      void 0 === i ||
                      i.delete(t);
                  }
                );
              }
              emit(e, t) {
                var i;
                null === (i = this.listeners.get(e)) ||
                  void 0 === i ||
                  i.forEach((i) => {
                    try {
                      i(t);
                    } catch (t) {
                      console.error(
                        `Error in event handler for "${String(e)}":`,
                        t,
                      );
                    }
                  });
              }
              off(e, t) {
                var i;
                t
                  ? null === (i = this.listeners.get(e)) ||
                    void 0 === i ||
                    i.delete(t)
                  : this.listeners.delete(e);
              }
              removeAllListeners() {
                this.listeners.clear();
              }
              listenerCount(e) {
                var t, i;
                return null !==
                  (i =
                    null === (t = this.listeners.get(e)) || void 0 === t
                      ? void 0
                      : t.size) && void 0 !== i
                  ? i
                  : 0;
              }
            }));
        },
        578: (e, t) => {
          var i, n, a, l, r, s, o, c, d, p;
          (Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.CDRRequestDirection =
              t.CDRRequestEvent =
              t.CDRRequestOrder =
              t.ParticipantEntryType =
              t.MediaFlow =
              t.SignalEvent =
              t.CallState =
              t.MediaConnectionState =
              t.ParticipantConnectionState =
              t.ParticipantState =
                void 0),
            (function (e) {
              ((e[(e.Idle = 0)] = "Idle"),
                (e[(e.Ringing = 1)] = "Ringing"),
                (e[(e.Joined = 2)] = "Joined"),
                (e[(e.Left = 3)] = "Left"),
                (e[(e.Declined = 4)] = "Declined"),
                (e[(e.Kicked = 5)] = "Kicked"),
                (e[(e.NoAnswer = 6)] = "NoAnswer"));
            })(i || (t.ParticipantState = i = {})),
            (function (e) {
              ((e[(e.Idle = 0)] = "Idle"),
                (e[(e.Connecting = 1)] = "Connecting"),
                (e[(e.Connected = 2)] = "Connected"),
                (e[(e.Reconnecting = 3)] = "Reconnecting"),
                (e[(e.Disconnected = 4)] = "Disconnected"));
            })(n || (t.ParticipantConnectionState = n = {})),
            (function (e) {
              ((e[(e.Idle = 0)] = "Idle"),
                (e[(e.Connecting = 1)] = "Connecting"),
                (e[(e.Connected = 2)] = "Connected"),
                (e[(e.Reconnecting = 3)] = "Reconnecting"),
                (e[(e.Disconnected = 4)] = "Disconnected"));
            })(a || (t.MediaConnectionState = a = {})),
            (function (e) {
              ((e.Idle = "idle"),
                (e.Connecting = "connecting"),
                (e.Connected = "connected"),
                (e.Closed = "closed"));
            })(l || (t.CallState = l = {})),
            (function (e) {
              ((e[(e.JOIN = 0)] = "JOIN"),
                (e[(e.LEAVE = 1)] = "LEAVE"),
                (e[(e.OFFER = 2)] = "OFFER"),
                (e[(e.ANSWER = 3)] = "ANSWER"),
                (e[(e.CONNECT = 4)] = "CONNECT"),
                (e[(e.ERROR = 5)] = "ERROR"),
                (e[(e.KICK = 6)] = "KICK"),
                (e[(e.SUCCESS = 7)] = "SUCCESS"),
                (e[(e.INVITE = 8)] = "INVITE"),
                (e[(e.DECLINE = 9)] = "DECLINE"),
                (e[(e.RINGING = 10)] = "RINGING"),
                (e[(e.INFO = 11)] = "INFO"),
                (e[(e.UPDATE = 12)] = "UPDATE"),
                (e[(e.CLOSE = 13)] = "CLOSE"),
                (e[(e.ICE = 14)] = "ICE"),
                (e[(e.GET_CALL = 15)] = "GET_CALL"),
                (e[(e.SWITCH_MEDIA_FLOW = 16)] = "SWITCH_MEDIA_FLOW"),
                (e[(e.NO_ANSWER = 17)] = "NO_ANSWER"),
                (e[(e.MEDIA_CONNECTED = 18)] = "MEDIA_CONNECTED"),
                (e[(e.MUTE = 19)] = "MUTE"),
                (e[(e.UNMUTE = 20)] = "UNMUTE"),
                (e[(e.HOLD = 21)] = "HOLD"),
                (e[(e.UNHOLD = 22)] = "UNHOLD"),
                (e[(e.VIDEO_ON = 23)] = "VIDEO_ON"),
                (e[(e.VIDEO_OFF = 24)] = "VIDEO_OFF"),
                (e[(e.SCREEN_SHARE_ON = 25)] = "SCREEN_SHARE_ON"),
                (e[(e.SCREEN_SHARE_OFF = 26)] = "SCREEN_SHARE_OFF"));
            })(r || (t.SignalEvent = r = {})),
            (function (e) {
              ((e[(e.P2P = 0)] = "P2P"),
                (e[(e.SFU = 1)] = "SFU"),
                (e[(e.S2W = 2)] = "S2W"));
            })(s || (t.MediaFlow = s = {})),
            (function (e) {
              e.ADDED = "ADDED";
            })(o || (t.ParticipantEntryType = o = {})),
            (function (e) {
              ((e[(e.ASC = 0)] = "ASC"), (e[(e.DESC = 1)] = "DESC"));
            })(c || (t.CDRRequestOrder = c = {})),
            (function (e) {
              ((e[(e.GET_RECENT_CALLS = 0)] = "GET_RECENT_CALLS"),
                (e[(e.GET_CALLS_BY_SESSION_IDS = 1)] =
                  "GET_CALLS_BY_SESSION_IDS"),
                (e[(e.DELETE_RECENT_CALLS = 2)] = "DELETE_RECENT_CALLS"));
            })(d || (t.CDRRequestEvent = d = {})),
            (function (e) {
              ((e[(e.NEXT = 0)] = "NEXT"), (e[(e.PREVIOUS = 1)] = "PREVIOUS"));
            })(p || (t.CDRRequestDirection = p = {})));
        },
        489: (e, t) => {
          (Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.makeFirstById = t.getEmptyVideoTrack = void 0),
            (t.getEmptyVideoTrack = () => {
              const e = document.createElement("canvas");
              return (
                e.getContext("2d"),
                (e.width = 640),
                (e.height = 480),
                e.captureStream().getVideoTracks()
              );
            }),
            (t.makeFirstById = (e, t, i) => {
              const n = new Set(),
                a = e.filter((e) => {
                  const t = `${e.id}${e.clientId ? `/${e.clientId}` : ""}`;
                  return !n.has(t) && (n.add(t), !0);
                }),
                l = a.findIndex(
                  (e) => e.id === t && (e.clientId === i || !e.clientId),
                );
              if (l > -1) {
                const [e] = a.splice(l, 1);
                a.unshift(e);
              }
              return a;
            }));
        },
        607: function (e, t, i) {
          var n =
              (this && this.__createBinding) ||
              (Object.create
                ? function (e, t, i, n) {
                    void 0 === n && (n = i);
                    var a = Object.getOwnPropertyDescriptor(t, i);
                    ((a &&
                      !("get" in a
                        ? !t.__esModule
                        : a.writable || a.configurable)) ||
                      (a = {
                        enumerable: !0,
                        get: function () {
                          return t[i];
                        },
                      }),
                      Object.defineProperty(e, n, a));
                  }
                : function (e, t, i, n) {
                    (void 0 === n && (n = i), (e[n] = t[i]));
                  }),
            a =
              (this && this.__exportStar) ||
              function (e, t) {
                for (var i in e)
                  "default" === i ||
                    Object.prototype.hasOwnProperty.call(t, i) ||
                    n(t, e, i);
              };
          Object.defineProperty(t, "__esModule", { value: !0 });
          const l = i(838);
          (a(i(838), t), (t.default = l.SceytCallClient));
        },
        838: function (e, t, i) {
          var n =
              (this && this.__createBinding) ||
              (Object.create
                ? function (e, t, i, n) {
                    void 0 === n && (n = i);
                    var a = Object.getOwnPropertyDescriptor(t, i);
                    ((a &&
                      !("get" in a
                        ? !t.__esModule
                        : a.writable || a.configurable)) ||
                      (a = {
                        enumerable: !0,
                        get: function () {
                          return t[i];
                        },
                      }),
                      Object.defineProperty(e, n, a));
                  }
                : function (e, t, i, n) {
                    (void 0 === n && (n = i), (e[n] = t[i]));
                  }),
            a =
              (this && this.__exportStar) ||
              function (e, t) {
                for (var i in e)
                  "default" === i ||
                    Object.prototype.hasOwnProperty.call(t, i) ||
                    n(t, e, i);
              };
          (Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.CDRRequestDirection =
              t.CDRRequestEvent =
              t.CDRRequestOrder =
              t.ParticipantEntryType =
              t.MediaConnectionState =
              t.ParticipantConnectionState =
              t.ParticipantState =
              t.CallState =
              t.MediaFlow =
              t.VideoTrack =
              t.AudioTrack =
              t.Participant =
              t.Call =
                void 0),
            a(i(271), t));
          var l = i(998);
          Object.defineProperty(t, "Call", {
            enumerable: !0,
            get: function () {
              return l.Call;
            },
          });
          var r = i(787);
          Object.defineProperty(t, "Participant", {
            enumerable: !0,
            get: function () {
              return r.Participant;
            },
          });
          var s = i(250);
          Object.defineProperty(t, "AudioTrack", {
            enumerable: !0,
            get: function () {
              return s.AudioTrack;
            },
          });
          var o = i(740);
          Object.defineProperty(t, "VideoTrack", {
            enumerable: !0,
            get: function () {
              return o.VideoTrack;
            },
          });
          var c = i(578);
          (Object.defineProperty(t, "MediaFlow", {
            enumerable: !0,
            get: function () {
              return c.MediaFlow;
            },
          }),
            Object.defineProperty(t, "CallState", {
              enumerable: !0,
              get: function () {
                return c.CallState;
              },
            }),
            Object.defineProperty(t, "ParticipantState", {
              enumerable: !0,
              get: function () {
                return c.ParticipantState;
              },
            }),
            Object.defineProperty(t, "ParticipantConnectionState", {
              enumerable: !0,
              get: function () {
                return c.ParticipantConnectionState;
              },
            }),
            Object.defineProperty(t, "MediaConnectionState", {
              enumerable: !0,
              get: function () {
                return c.MediaConnectionState;
              },
            }),
            Object.defineProperty(t, "ParticipantEntryType", {
              enumerable: !0,
              get: function () {
                return c.ParticipantEntryType;
              },
            }),
            Object.defineProperty(t, "CDRRequestOrder", {
              enumerable: !0,
              get: function () {
                return c.CDRRequestOrder;
              },
            }),
            Object.defineProperty(t, "CDRRequestEvent", {
              enumerable: !0,
              get: function () {
                return c.CDRRequestEvent;
              },
            }),
            Object.defineProperty(t, "CDRRequestDirection", {
              enumerable: !0,
              get: function () {
                return c.CDRRequestDirection;
              },
            }),
            a(i(645), t));
        },
        645: (e, t) => {
          (Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.createLogger = t.removeLogListener = t.addLogListener = void 0));
          const i = {
              green: "[32m",
              blue: "[34m",
              "light-green": "[34m",
              "light-blue": "[34m",
              yellow: "[33m",
              magenta: "[35m",
              cyan: "[36m",
              reset: "[0m",
              orange: "[33m",
              red: "[31m",
              white: "[37m",
            },
            n = [];
          ((t.addLogListener = (e) => {
            n.push(e);
          }),
            (t.removeLogListener = (e) => {
              const t = n.indexOf(e);
              -1 !== t && n.splice(t, 1);
            }),
            (t.createLogger = (e, t = "white") => {
              const a = `[SceytCallClient] ${e ? `[${e}]` : ""}:`,
                l = (e, l, r, s) => {
                  var o;
                  const c =
                      null !== (o = null == s ? void 0 : s.color) &&
                      void 0 !== o
                        ? o
                        : t,
                    d = {
                      level: e,
                      message: l,
                      prefix: a,
                      args: r.filter(
                        (e) =>
                          !(null == e ? void 0 : e.color) &&
                          !(null == e ? void 0 : e.time),
                      ),
                      color: i[c],
                      time:
                        (null == s ? void 0 : s.time) ||
                        new Date().toISOString(),
                    };
                  n.forEach((e) => e(d));
                };
              return {
                trace: (e, t) => {
                  l("trace", e, [], t);
                },
                debug: (e, t) => {
                  l("debug", e, [], t);
                },
                info: (e, t) => {
                  l("info", e, [], t);
                },
                warn: (e, t) => {
                  l("warn", e, [], t);
                },
                error: (e, t) => {
                  l("error", e, [], t);
                },
              };
            }),
            (t.default = (0, t.createLogger)("SceytCallClient")));
        },
        429: (e, t, i) => {
          (Object.defineProperty(t, "__esModule", { value: !0 }),
            Object.defineProperty(t, "NIL", {
              enumerable: !0,
              get: function () {
                return s.default;
              },
            }),
            Object.defineProperty(t, "parse", {
              enumerable: !0,
              get: function () {
                return p.default;
              },
            }),
            Object.defineProperty(t, "stringify", {
              enumerable: !0,
              get: function () {
                return d.default;
              },
            }),
            Object.defineProperty(t, "v1", {
              enumerable: !0,
              get: function () {
                return n.default;
              },
            }),
            Object.defineProperty(t, "v3", {
              enumerable: !0,
              get: function () {
                return a.default;
              },
            }),
            Object.defineProperty(t, "v4", {
              enumerable: !0,
              get: function () {
                return l.default;
              },
            }),
            Object.defineProperty(t, "v5", {
              enumerable: !0,
              get: function () {
                return r.default;
              },
            }),
            Object.defineProperty(t, "validate", {
              enumerable: !0,
              get: function () {
                return c.default;
              },
            }),
            Object.defineProperty(t, "version", {
              enumerable: !0,
              get: function () {
                return o.default;
              },
            }));
          var n = u(i(990)),
            a = u(i(237)),
            l = u(i(355)),
            r = u(i(764)),
            s = u(i(314)),
            o = u(i(464)),
            c = u(i(435)),
            d = u(i(8)),
            p = u(i(222));
          function u(e) {
            return e && e.__esModule ? e : { default: e };
          }
        },
        163: (e, t) => {
          function i(e) {
            return 14 + (((e + 64) >>> 9) << 4) + 1;
          }
          function n(e, t) {
            const i = (65535 & e) + (65535 & t);
            return (((e >> 16) + (t >> 16) + (i >> 16)) << 16) | (65535 & i);
          }
          function a(e, t, i, a, l, r) {
            return n(
              ((s = n(n(t, e), n(a, r))) << (o = l)) | (s >>> (32 - o)),
              i,
            );
            var s, o;
          }
          function l(e, t, i, n, l, r, s) {
            return a((t & i) | (~t & n), e, t, l, r, s);
          }
          function r(e, t, i, n, l, r, s) {
            return a((t & n) | (i & ~n), e, t, l, r, s);
          }
          function s(e, t, i, n, l, r, s) {
            return a(t ^ i ^ n, e, t, l, r, s);
          }
          function o(e, t, i, n, l, r, s) {
            return a(i ^ (t | ~n), e, t, l, r, s);
          }
          (Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.default = void 0));
          t.default = function (e) {
            if ("string" == typeof e) {
              const t = unescape(encodeURIComponent(e));
              e = new Uint8Array(t.length);
              for (let i = 0; i < t.length; ++i) e[i] = t.charCodeAt(i);
            }
            return (function (e) {
              const t = [],
                i = 32 * e.length,
                n = "0123456789abcdef";
              for (let a = 0; a < i; a += 8) {
                const i = (e[a >> 5] >>> (a % 32)) & 255,
                  l = parseInt(n.charAt((i >>> 4) & 15) + n.charAt(15 & i), 16);
                t.push(l);
              }
              return t;
            })(
              (function (e, t) {
                ((e[t >> 5] |= 128 << (t % 32)), (e[i(t) - 1] = t));
                let a = 1732584193,
                  c = -271733879,
                  d = -1732584194,
                  p = 271733878;
                for (let t = 0; t < e.length; t += 16) {
                  const i = a,
                    u = c,
                    g = d,
                    h = p;
                  ((a = l(a, c, d, p, e[t], 7, -680876936)),
                    (p = l(p, a, c, d, e[t + 1], 12, -389564586)),
                    (d = l(d, p, a, c, e[t + 2], 17, 606105819)),
                    (c = l(c, d, p, a, e[t + 3], 22, -1044525330)),
                    (a = l(a, c, d, p, e[t + 4], 7, -176418897)),
                    (p = l(p, a, c, d, e[t + 5], 12, 1200080426)),
                    (d = l(d, p, a, c, e[t + 6], 17, -1473231341)),
                    (c = l(c, d, p, a, e[t + 7], 22, -45705983)),
                    (a = l(a, c, d, p, e[t + 8], 7, 1770035416)),
                    (p = l(p, a, c, d, e[t + 9], 12, -1958414417)),
                    (d = l(d, p, a, c, e[t + 10], 17, -42063)),
                    (c = l(c, d, p, a, e[t + 11], 22, -1990404162)),
                    (a = l(a, c, d, p, e[t + 12], 7, 1804603682)),
                    (p = l(p, a, c, d, e[t + 13], 12, -40341101)),
                    (d = l(d, p, a, c, e[t + 14], 17, -1502002290)),
                    (c = l(c, d, p, a, e[t + 15], 22, 1236535329)),
                    (a = r(a, c, d, p, e[t + 1], 5, -165796510)),
                    (p = r(p, a, c, d, e[t + 6], 9, -1069501632)),
                    (d = r(d, p, a, c, e[t + 11], 14, 643717713)),
                    (c = r(c, d, p, a, e[t], 20, -373897302)),
                    (a = r(a, c, d, p, e[t + 5], 5, -701558691)),
                    (p = r(p, a, c, d, e[t + 10], 9, 38016083)),
                    (d = r(d, p, a, c, e[t + 15], 14, -660478335)),
                    (c = r(c, d, p, a, e[t + 4], 20, -405537848)),
                    (a = r(a, c, d, p, e[t + 9], 5, 568446438)),
                    (p = r(p, a, c, d, e[t + 14], 9, -1019803690)),
                    (d = r(d, p, a, c, e[t + 3], 14, -187363961)),
                    (c = r(c, d, p, a, e[t + 8], 20, 1163531501)),
                    (a = r(a, c, d, p, e[t + 13], 5, -1444681467)),
                    (p = r(p, a, c, d, e[t + 2], 9, -51403784)),
                    (d = r(d, p, a, c, e[t + 7], 14, 1735328473)),
                    (c = r(c, d, p, a, e[t + 12], 20, -1926607734)),
                    (a = s(a, c, d, p, e[t + 5], 4, -378558)),
                    (p = s(p, a, c, d, e[t + 8], 11, -2022574463)),
                    (d = s(d, p, a, c, e[t + 11], 16, 1839030562)),
                    (c = s(c, d, p, a, e[t + 14], 23, -35309556)),
                    (a = s(a, c, d, p, e[t + 1], 4, -1530992060)),
                    (p = s(p, a, c, d, e[t + 4], 11, 1272893353)),
                    (d = s(d, p, a, c, e[t + 7], 16, -155497632)),
                    (c = s(c, d, p, a, e[t + 10], 23, -1094730640)),
                    (a = s(a, c, d, p, e[t + 13], 4, 681279174)),
                    (p = s(p, a, c, d, e[t], 11, -358537222)),
                    (d = s(d, p, a, c, e[t + 3], 16, -722521979)),
                    (c = s(c, d, p, a, e[t + 6], 23, 76029189)),
                    (a = s(a, c, d, p, e[t + 9], 4, -640364487)),
                    (p = s(p, a, c, d, e[t + 12], 11, -421815835)),
                    (d = s(d, p, a, c, e[t + 15], 16, 530742520)),
                    (c = s(c, d, p, a, e[t + 2], 23, -995338651)),
                    (a = o(a, c, d, p, e[t], 6, -198630844)),
                    (p = o(p, a, c, d, e[t + 7], 10, 1126891415)),
                    (d = o(d, p, a, c, e[t + 14], 15, -1416354905)),
                    (c = o(c, d, p, a, e[t + 5], 21, -57434055)),
                    (a = o(a, c, d, p, e[t + 12], 6, 1700485571)),
                    (p = o(p, a, c, d, e[t + 3], 10, -1894986606)),
                    (d = o(d, p, a, c, e[t + 10], 15, -1051523)),
                    (c = o(c, d, p, a, e[t + 1], 21, -2054922799)),
                    (a = o(a, c, d, p, e[t + 8], 6, 1873313359)),
                    (p = o(p, a, c, d, e[t + 15], 10, -30611744)),
                    (d = o(d, p, a, c, e[t + 6], 15, -1560198380)),
                    (c = o(c, d, p, a, e[t + 13], 21, 1309151649)),
                    (a = o(a, c, d, p, e[t + 4], 6, -145523070)),
                    (p = o(p, a, c, d, e[t + 11], 10, -1120210379)),
                    (d = o(d, p, a, c, e[t + 2], 15, 718787259)),
                    (c = o(c, d, p, a, e[t + 9], 21, -343485551)),
                    (a = n(a, i)),
                    (c = n(c, u)),
                    (d = n(d, g)),
                    (p = n(p, h)));
                }
                return [a, c, d, p];
              })(
                (function (e) {
                  if (0 === e.length) return [];
                  const t = 8 * e.length,
                    n = new Uint32Array(i(t));
                  for (let i = 0; i < t; i += 8)
                    n[i >> 5] |= (255 & e[i / 8]) << (i % 32);
                  return n;
                })(e),
                8 * e.length,
              ),
            );
          };
        },
        790: (e, t) => {
          (Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.default = void 0));
          var i = {
            randomUUID:
              "undefined" != typeof crypto &&
              crypto.randomUUID &&
              crypto.randomUUID.bind(crypto),
          };
          t.default = i;
        },
        314: (e, t) => {
          (Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.default = void 0),
            (t.default = "00000000-0000-0000-0000-000000000000"));
        },
        222: (e, t, i) => {
          (Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.default = void 0));
          var n,
            a = (n = i(435)) && n.__esModule ? n : { default: n };
          t.default = function (e) {
            if (!(0, a.default)(e)) throw TypeError("Invalid UUID");
            let t;
            const i = new Uint8Array(16);
            return (
              (i[0] = (t = parseInt(e.slice(0, 8), 16)) >>> 24),
              (i[1] = (t >>> 16) & 255),
              (i[2] = (t >>> 8) & 255),
              (i[3] = 255 & t),
              (i[4] = (t = parseInt(e.slice(9, 13), 16)) >>> 8),
              (i[5] = 255 & t),
              (i[6] = (t = parseInt(e.slice(14, 18), 16)) >>> 8),
              (i[7] = 255 & t),
              (i[8] = (t = parseInt(e.slice(19, 23), 16)) >>> 8),
              (i[9] = 255 & t),
              (i[10] =
                ((t = parseInt(e.slice(24, 36), 16)) / 1099511627776) & 255),
              (i[11] = (t / 4294967296) & 255),
              (i[12] = (t >>> 24) & 255),
              (i[13] = (t >>> 16) & 255),
              (i[14] = (t >>> 8) & 255),
              (i[15] = 255 & t),
              i
            );
          };
        },
        58: (e, t) => {
          (Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.default = void 0),
            (t.default =
              /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i));
        },
        319: (e, t) => {
          let i;
          (Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.default = function () {
              if (
                !i &&
                ((i =
                  "undefined" != typeof crypto &&
                  crypto.getRandomValues &&
                  crypto.getRandomValues.bind(crypto)),
                !i)
              )
                throw new Error(
                  "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported",
                );
              return i(n);
            }));
          const n = new Uint8Array(16);
        },
        757: (e, t) => {
          function i(e, t, i, n) {
            switch (e) {
              case 0:
                return (t & i) ^ (~t & n);
              case 1:
              case 3:
                return t ^ i ^ n;
              case 2:
                return (t & i) ^ (t & n) ^ (i & n);
            }
          }
          function n(e, t) {
            return (e << t) | (e >>> (32 - t));
          }
          (Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.default = void 0));
          t.default = function (e) {
            const t = [1518500249, 1859775393, 2400959708, 3395469782],
              a = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
            if ("string" == typeof e) {
              const t = unescape(encodeURIComponent(e));
              e = [];
              for (let i = 0; i < t.length; ++i) e.push(t.charCodeAt(i));
            } else Array.isArray(e) || (e = Array.prototype.slice.call(e));
            e.push(128);
            const l = e.length / 4 + 2,
              r = Math.ceil(l / 16),
              s = new Array(r);
            for (let t = 0; t < r; ++t) {
              const i = new Uint32Array(16);
              for (let n = 0; n < 16; ++n)
                i[n] =
                  (e[64 * t + 4 * n] << 24) |
                  (e[64 * t + 4 * n + 1] << 16) |
                  (e[64 * t + 4 * n + 2] << 8) |
                  e[64 * t + 4 * n + 3];
              s[t] = i;
            }
            ((s[r - 1][14] = (8 * (e.length - 1)) / Math.pow(2, 32)),
              (s[r - 1][14] = Math.floor(s[r - 1][14])),
              (s[r - 1][15] = (8 * (e.length - 1)) & 4294967295));
            for (let e = 0; e < r; ++e) {
              const l = new Uint32Array(80);
              for (let t = 0; t < 16; ++t) l[t] = s[e][t];
              for (let e = 16; e < 80; ++e)
                l[e] = n(l[e - 3] ^ l[e - 8] ^ l[e - 14] ^ l[e - 16], 1);
              let r = a[0],
                o = a[1],
                c = a[2],
                d = a[3],
                p = a[4];
              for (let e = 0; e < 80; ++e) {
                const a = Math.floor(e / 20),
                  s = (n(r, 5) + i(a, o, c, d) + p + t[a] + l[e]) >>> 0;
                ((p = d), (d = c), (c = n(o, 30) >>> 0), (o = r), (r = s));
              }
              ((a[0] = (a[0] + r) >>> 0),
                (a[1] = (a[1] + o) >>> 0),
                (a[2] = (a[2] + c) >>> 0),
                (a[3] = (a[3] + d) >>> 0),
                (a[4] = (a[4] + p) >>> 0));
            }
            return [
              (a[0] >> 24) & 255,
              (a[0] >> 16) & 255,
              (a[0] >> 8) & 255,
              255 & a[0],
              (a[1] >> 24) & 255,
              (a[1] >> 16) & 255,
              (a[1] >> 8) & 255,
              255 & a[1],
              (a[2] >> 24) & 255,
              (a[2] >> 16) & 255,
              (a[2] >> 8) & 255,
              255 & a[2],
              (a[3] >> 24) & 255,
              (a[3] >> 16) & 255,
              (a[3] >> 8) & 255,
              255 & a[3],
              (a[4] >> 24) & 255,
              (a[4] >> 16) & 255,
              (a[4] >> 8) & 255,
              255 & a[4],
            ];
          };
        },
        8: (e, t, i) => {
          (Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.default = void 0),
            (t.unsafeStringify = r));
          var n,
            a = (n = i(435)) && n.__esModule ? n : { default: n };
          const l = [];
          for (let e = 0; e < 256; ++e) l.push((e + 256).toString(16).slice(1));
          function r(e, t = 0) {
            return (
              l[e[t + 0]] +
              l[e[t + 1]] +
              l[e[t + 2]] +
              l[e[t + 3]] +
              "-" +
              l[e[t + 4]] +
              l[e[t + 5]] +
              "-" +
              l[e[t + 6]] +
              l[e[t + 7]] +
              "-" +
              l[e[t + 8]] +
              l[e[t + 9]] +
              "-" +
              l[e[t + 10]] +
              l[e[t + 11]] +
              l[e[t + 12]] +
              l[e[t + 13]] +
              l[e[t + 14]] +
              l[e[t + 15]]
            );
          }
          t.default = function (e, t = 0) {
            const i = r(e, t);
            if (!(0, a.default)(i))
              throw TypeError("Stringified UUID is invalid");
            return i;
          };
        },
        990: (e, t, i) => {
          (Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.default = void 0));
          var n,
            a = (n = i(319)) && n.__esModule ? n : { default: n },
            l = i(8);
          let r,
            s,
            o = 0,
            c = 0;
          t.default = function (e, t, i) {
            let n = (t && i) || 0;
            const d = t || new Array(16);
            let p = (e = e || {}).node || r,
              u = void 0 !== e.clockseq ? e.clockseq : s;
            if (null == p || null == u) {
              const t = e.random || (e.rng || a.default)();
              (null == p && (p = r = [1 | t[0], t[1], t[2], t[3], t[4], t[5]]),
                null == u && (u = s = 16383 & ((t[6] << 8) | t[7])));
            }
            let g = void 0 !== e.msecs ? e.msecs : Date.now(),
              h = void 0 !== e.nsecs ? e.nsecs : c + 1;
            const S = g - o + (h - c) / 1e4;
            if (
              (S < 0 && void 0 === e.clockseq && (u = (u + 1) & 16383),
              (S < 0 || g > o) && void 0 === e.nsecs && (h = 0),
              h >= 1e4)
            )
              throw new Error(
                "uuid.v1(): Can't create more than 10M uuids/sec",
              );
            ((o = g), (c = h), (s = u), (g += 122192928e5));
            const C = (1e4 * (268435455 & g) + h) % 4294967296;
            ((d[n++] = (C >>> 24) & 255),
              (d[n++] = (C >>> 16) & 255),
              (d[n++] = (C >>> 8) & 255),
              (d[n++] = 255 & C));
            const f = ((g / 4294967296) * 1e4) & 268435455;
            ((d[n++] = (f >>> 8) & 255),
              (d[n++] = 255 & f),
              (d[n++] = ((f >>> 24) & 15) | 16),
              (d[n++] = (f >>> 16) & 255),
              (d[n++] = (u >>> 8) | 128),
              (d[n++] = 255 & u));
            for (let e = 0; e < 6; ++e) d[n + e] = p[e];
            return t || (0, l.unsafeStringify)(d);
          };
        },
        237: (e, t, i) => {
          (Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.default = void 0));
          var n = l(i(925)),
            a = l(i(163));
          function l(e) {
            return e && e.__esModule ? e : { default: e };
          }
          var r = (0, n.default)("v3", 48, a.default);
          t.default = r;
        },
        925: (e, t, i) => {
          (Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.URL = t.DNS = void 0),
            (t.default = function (e, t, i) {
              function n(e, n, r, s) {
                var o;
                if (
                  ("string" == typeof e &&
                    (e = (function (e) {
                      e = unescape(encodeURIComponent(e));
                      const t = [];
                      for (let i = 0; i < e.length; ++i)
                        t.push(e.charCodeAt(i));
                      return t;
                    })(e)),
                  "string" == typeof n && (n = (0, l.default)(n)),
                  16 !== (null === (o = n) || void 0 === o ? void 0 : o.length))
                )
                  throw TypeError(
                    "Namespace must be array-like (16 iterable integer values, 0-255)",
                  );
                let c = new Uint8Array(16 + e.length);
                if (
                  (c.set(n),
                  c.set(e, n.length),
                  (c = i(c)),
                  (c[6] = (15 & c[6]) | t),
                  (c[8] = (63 & c[8]) | 128),
                  r)
                ) {
                  s = s || 0;
                  for (let e = 0; e < 16; ++e) r[s + e] = c[e];
                  return r;
                }
                return (0, a.unsafeStringify)(c);
              }
              try {
                n.name = e;
              } catch (e) {}
              return ((n.DNS = r), (n.URL = s), n);
            }));
          var n,
            a = i(8),
            l = (n = i(222)) && n.__esModule ? n : { default: n };
          const r = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
          t.DNS = r;
          const s = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
          t.URL = s;
        },
        355: (e, t, i) => {
          (Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.default = void 0));
          var n = r(i(790)),
            a = r(i(319)),
            l = i(8);
          function r(e) {
            return e && e.__esModule ? e : { default: e };
          }
          t.default = function (e, t, i) {
            if (n.default.randomUUID && !t && !e) return n.default.randomUUID();
            const r = (e = e || {}).random || (e.rng || a.default)();
            if (((r[6] = (15 & r[6]) | 64), (r[8] = (63 & r[8]) | 128), t)) {
              i = i || 0;
              for (let e = 0; e < 16; ++e) t[i + e] = r[e];
              return t;
            }
            return (0, l.unsafeStringify)(r);
          };
        },
        764: (e, t, i) => {
          (Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.default = void 0));
          var n = l(i(925)),
            a = l(i(757));
          function l(e) {
            return e && e.__esModule ? e : { default: e };
          }
          var r = (0, n.default)("v5", 80, a.default);
          t.default = r;
        },
        435: (e, t, i) => {
          (Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.default = void 0));
          var n,
            a = (n = i(58)) && n.__esModule ? n : { default: n };
          t.default = function (e) {
            return "string" == typeof e && a.default.test(e);
          };
        },
        464: (e, t, i) => {
          (Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.default = void 0));
          var n,
            a = (n = i(435)) && n.__esModule ? n : { default: n };
          t.default = function (e) {
            if (!(0, a.default)(e)) throw TypeError("Invalid UUID");
            return parseInt(e.slice(14, 15), 16);
          };
        },
      },
      t = {};
    return (function i(n) {
      var a = t[n];
      if (void 0 !== a) return a.exports;
      var l = (t[n] = { exports: {} });
      return (e[n].call(l.exports, l, l.exports, i), l.exports);
    })(607);
  })(),
);
