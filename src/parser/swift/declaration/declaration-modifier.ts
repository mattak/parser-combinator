import {Parser} from "../../../types";
import {cat, or} from "../../../combinators";
import {map, str} from "../../../util";
import {char} from "../../../char";
import {whitespace0} from "../lexical-struct/whitespace";
import {
  SwiftAccessLevelModifier, SwiftActorIsolationModifier, SwiftDeclarationModifier,
  SwiftDeclarationModifierPrimitive,
  SwiftMutationModifier
} from "../../../syntax/swift";

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

export const mutatingModifier: Parser<SwiftMutationModifier> = or([
  str('mutating'),
  str('nonmutating')
]);

export const actorIsolationModifier: Parser<SwiftActorIsolationModifier> = str('nonisolated');

export const declarationModifier: Parser<SwiftDeclarationModifier> = or([
  declarationModifierPrimitive,
  accessLevelModifier,
  mutatingModifier,
  actorIsolationModifier,
]);
