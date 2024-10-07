export const idlFactory = ({ IDL }) => {
  const File = IDL.Record({
    'content' : IDL.Vec(IDL.Nat8),
    'contentType' : IDL.Text,
    'name' : IDL.Text,
  });
  return IDL.Service({
    'getFile' : IDL.Func([IDL.Text], [IDL.Opt(File)], ['query']),
    'listFiles' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'uploadFile' : IDL.Func([IDL.Text, IDL.Vec(IDL.Nat8), IDL.Text], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
