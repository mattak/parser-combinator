import {Parser} from "../../../types";
import {cat, or} from "../../../combinators";
import {map, str} from "../../../util";
import {char} from "../../../char";
import {whitespace0} from "../lexical-struct/whitespace";

type SwiftDeclarationModifierPrimitive =
  'class'
  | 'convenience'
  | 'dynamic'
  | 'final'
  | 'infix'
  | 'lazy'
  | 'optional'
  | 'override'
  | 'postfix'
  | 'prefix'
  | 'required'
  | 'static'
  | 'unowned'
  | 'unowned(safe)'
  | 'unowned(unsafe)'
  | 'weak';

export const declarationModifierPrimitive: Parser<SwiftDeclarationModifierPrimitive> = or([
  str('class'),
  str('convenience'),
  str('dynamic'),
  str('final'),
  str('infix'),
  str('lazy'),
  str('optional'),
  str('override'),
  str('postfix'),
  str('prefix'),
  str('required'),
  str('static'),
  map(
    cat([str('unowned'), whitespace0, char('('), whitespace0, str('safe'), whitespace0, char(')')]),
    (s) => 'unowned(safe)',
  ),
  map(
    cat([str('unowned'), whitespace0, char('('), whitespace0, str('unsafe'), whitespace0, char(')')]),
    (s) => 'unowned(unsafe)',
  ),
  str('unowned'),
  str('weak'),
]);

export type SwiftAccessLevelModifier =
  'private' | 'private(set)'
  | 'fileprivate' | 'fileprivate(set)'
  | 'internal' | 'internal(set)'
  | 'public' | 'public(set)'
  | 'open' | 'open(set)'
  ;

export const accessLevelModifier: Parser<SwiftAccessLevelModifier> = or([
  map(
    cat([str('private'), whitespace0, char('('), whitespace0, str('set'), whitespace0, char(')')]),
    (s) => 'private(set)',
  ),
  map(
    cat([str('fileprivate'), whitespace0, char('('), whitespace0, str('set'), whitespace0, char(')')]),
    (s) => 'fileprivate(set)',
  ),
  map(
    cat([str('internal'), whitespace0, char('('), whitespace0, str('set'), whitespace0, char(')')]),
    (s) => 'internal(set)',
  ),
  map(
    cat([str('public'), whitespace0, char('('), whitespace0, str('set'), whitespace0, char(')')]),
    (s) => 'public(set)',
  ),
  map(
    cat([str('open'), whitespace0, char('('), whitespace0, str('set'), whitespace0, char(')')]),
    (s) => 'open(set)',
  ),
  str('private'),
  str('fileprivate'),
  str('internal'),
  str('internal'),
  str('public'),
  str('open'),
]);

type SwiftMutationModifier = 'mutating' | 'nonmutating';

export const mutatingModifier: Parser<SwiftMutationModifier> = or([
  str('mutating'),
  str('nonmutating')
]);

type SwiftActorIsolationModifier = 'nonisolated';

export const actorIsolationModifier: Parser<SwiftActorIsolationModifier> = str('nonisolated');

export type SwiftDeclarationModifier =
  SwiftDeclarationModifierPrimitive
  | SwiftAccessLevelModifier
  | SwiftMutationModifier
  | SwiftActorIsolationModifier;
export const declarationModifier: Parser<SwiftDeclarationModifier> = or([
  declarationModifierPrimitive,
  accessLevelModifier,
  mutatingModifier,
  actorIsolationModifier,
]);